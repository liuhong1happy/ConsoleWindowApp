var React = require('react');
var AppManageStore = require('../../stores/AppManageStore');
var WinAppConstants = require('../../constants/WinAppConstants');
var AppStoreForm = React.createClass({
    getInitialState:function(){
        return {
            StoreApps:AppManageStore.getStoreApps(),
        };
    },
    componentDidMount:function(){
        AppManageStore.addChangeListener(WinAppConstants.EventTypes.STORE_APPS,this._onChange);
    },
    componentWillUnmount:function(){
        AppManageStore.addChangeListener(WinAppConstants.EventTypes.STORE_APPS,this._onChange);
    },
    _onChange:function(){
        this.setState({ StoreApps: AppManageStore.getStoreApps() });
    },
    render: function() {
        var games = this.state.StoreApps.filter(function(ele,pos){
            return ele.category == "game";
        });
        var news =  this.state.StoreApps.filter(function(ele,pos){
            return ele.category == "news";
        });
        
        return (
            <div className="appstore-form">
                <div className="appstore-category">
                    <div className="category-name">游戏</div>
                    {
                         games.map(function(game){
                            return (<div className="app-content">
                                            <div className="app-icon" style={ { "background-image" :"url("+game.image+")"} }></div>
                                            <div className="app-item">{game.name}</div>
                                    </div>)
                        })
                    }
                </div>
                <div className="appstore-category">
                    <div className="category-name">新闻</div>
                    {
                         news.map(function(_news){
                            return (<div className="app-content">
                                            <div className="app-icon" style={ { "background-image" :"url("+_news.image+")"} }></div>
                                            <div className="app-item">{_news.name}</div>
                                    </div>)
                        })
                    }
                </div>
            </div>
        );
  }
});
module.exports = AppStoreForm;
