package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	//"launchpad.net/goyaml"
	"github.com/goinggo/beego-mgo/go-i18n/i18n/bundle"
	"github.com/goinggo/beego-mgo/go-i18n/i18n/locale"
	"github.com/goinggo/beego-mgo/go-i18n/i18n/translation"
	"path/filepath"
	"reflect"
	"sort"
)

type mergeCommand struct {
	translationFiles []string
	sourceLocaleID   string
	outdir           string
	format           string
}

func (mc *mergeCommand) execute() error {
	if len(mc.translationFiles) < 1 {
		return fmt.Errorf("need at least one translation file to parse")
	}

	if _, err := locale.New(mc.sourceLocaleID); err != nil {
		return fmt.Errorf("invalid source locale %s: %s", mc.sourceLocaleID, err)
	}

	marshal, err := newMarshalFunc(mc.format)
	if err != nil {
		return err
	}

	bundle := bundle.New()
	for _, tf := range mc.translationFiles {
		if err := bundle.LoadTranslationFile(tf); err != nil {
			return fmt.Errorf("failed to load translation file %s because %s\n", tf, err)
		}
	}

	translations := bundle.Translations()
	sourceTranslations := translations[mc.sourceLocaleID]
	for translationID, src := range sourceTranslations {
		for _, localeTranslations := range translations {
			if dst := localeTranslations[translationID]; dst == nil || reflect.TypeOf(src) != reflect.TypeOf(dst) {
				localeTranslations[translationID] = src.UntranslatedCopy()
			}
		}
	}

	for localeID, localeTranslations := range translations {
		locale := locale.MustNew(localeID)
		all := filter(localeTranslations, func(t translation.Translation) translation.Translation {
			return t.Normalize(locale.Language)
		})
		if err := mc.writeFile("all", all, localeID, marshal); err != nil {
			return err
		}

		untranslated := filter(localeTranslations, func(t translation.Translation) translation.Translation {
			if t.Incomplete(locale.Language) {
				return t.Normalize(locale.Language).Backfill(sourceTranslations[t.ID()])
			}
			return nil
		})
		if err := mc.writeFile("untranslated", untranslated, localeID, marshal); err != nil {
			return err
		}
	}
	return nil
}

type marshalFunc func(interface{}) ([]byte, error)

func (mc *mergeCommand) writeFile(label string, translations []translation.Translation, localeID string, marshal marshalFunc) error {
	sort.Sort(translation.SortableByID(translations))
	buf, err := marshal(marshalInterface(translations))
	if err != nil {
		return fmt.Errorf("failed to marshal %s strings to %s because %s", localeID, mc.format, err)
	}
	filename := filepath.Join(mc.outdir, fmt.Sprintf("%s.%s.%s", localeID, label, mc.format))
	if err := ioutil.WriteFile(filename, buf, 0666); err != nil {
		return fmt.Errorf("failed to write %s because %s", filename, err)
	}
	return nil
}

func filter(translations map[string]translation.Translation, filter func(translation.Translation) translation.Translation) []translation.Translation {
	filtered := make([]translation.Translation, 0, len(translations))
	for _, translation := range translations {
		if t := filter(translation); t != nil {
			filtered = append(filtered, t)
		}
	}
	return filtered

}

func newMarshalFunc(format string) (marshalFunc, error) {
	switch format {
	case "json":
		return func(v interface{}) ([]byte, error) {
			return json.MarshalIndent(v, "", "  ")
		}, nil
		/*
			case "yaml":
				return func(v interface{}) ([]byte, error) {
					return goyaml.Marshal(v)
				}, nil
		*/
	}
	return nil, fmt.Errorf("unsupported format: %s\n", format)
}

func marshalInterface(translations []translation.Translation) []interface{} {
	mi := make([]interface{}, len(translations))
	for i, translation := range translations {
		mi[i] = translation.MarshalInterface()
	}
	return mi
}
