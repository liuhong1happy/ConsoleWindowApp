var React = require('react');
var AppManageStore = require('../../stores/AppManageStore');

var AppStoreForm = React.createClass({
    getInitialState:function(){
        return {
            StoreApps:AppManageStore.getStoreApps(),
        };
    },
    render: function() {
        return (
            <div className="appmanage-form">
                 
            </div>
        );
  }
});
module.exports = AppStoreForm;
