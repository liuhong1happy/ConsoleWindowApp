package translation

import (
	"github.com/goinggo/beego-mgo/go-i18n/i18n/language"
	"github.com/goinggo/beego-mgo/go-i18n/i18n/plural"
)

type pluralTranslation struct {
	id        string
	templates map[plural.Category]*template
}

func (pt *pluralTranslation) MarshalInterface() interface{} {
	return map[string]interface{}{
		"id":          pt.id,
		"translation": pt.templates,
	}
}

func (pt *pluralTranslation) ID() string {
	return pt.id
}

func (pt *pluralTranslation) Template(pc plural.Category) *template {
	return pt.templates[pc]
}

func (pt *pluralTranslation) UntranslatedCopy() Translation {
	return &pluralTranslation{pt.id, make(map[plural.Category]*template)}
}

func (pt *pluralTranslation) Normalize(l *language.Language) Translation {
	// Delete plural categories that don't belong to this language.
	for pc := range pt.templates {
		if _, ok := l.PluralCategories[pc]; !ok {
			delete(pt.templates, pc)
		}
	}
	// Create map entries for missing valid categories.
	for pc := range l.PluralCategories {
		if _, ok := pt.templates[pc]; !ok {
			pt.templates[pc] = mustNewTemplate("")
		}
	}
	return pt
}

func (pt *pluralTranslation) Backfill(src Translation) Translation {
	for pc, t := range pt.templates {
		if t == nil || t.src == "" {
			pt.templates[pc] = src.Template(plural.Other)
		}
	}
	return pt
}

func (pt *pluralTranslation) Merge(t Translation) Translation {
	other, ok := t.(*pluralTranslation)
	if !ok || pt.ID() != t.ID() {
		return t
	}
	for pluralCategory, template := range other.templates {
		if template != nil && template.src != "" {
			pt.templates[pluralCategory] = template
		}
	}
	return pt
}

func (pt *pluralTranslation) Incomplete(l *language.Language) bool {
	for pc := range l.PluralCategories {
		if t := pt.templates[pc]; t == nil || t.src == "" {
			return true
		}
	}
	return false
}

var _ = Translation(&pluralTranslation{})
