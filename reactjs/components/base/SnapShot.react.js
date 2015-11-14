var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');
var SnapShot = React.createClass({
    getInitialState: function() {
        return {
            order:this.props.order?this.props.order:0,
            snapshot:this.props.snapshot,
            window:WinSettingsStore.getWindowById(this.props.snapshot.id)
        };
    },
    showWindow:function(){
        WinSettingsActionCreators.showWindow(this.state.window)
    },
    closeWindow:function(){
        WinSettingsActionCreators.closeWindow(this.state.window);
        if(this.props.closeSnapShot) 
            this.props.closeSnapShot(this.state.order);
    },
    render: function() {
        var snapshot = this.state.snapshot;
        var _window = this.state.window;
        if(!_window || !snapshot){
            return (<div></div>)
        }
        var parentStyle = {
            left:this.state.order*250
        }
        
        return (
            <div className="snapshot" style={parentStyle} onMouseEnter={this.handleHover}  onMouseLeave={this.handleUnhover} onClick={this.showWindow}>
                <div className="snapshot-header" >
                    <img className="header-img" src={_window.image?_window.image:snapshot.image} />
                    <div  className="header-title" >{ _window.name?_window.name:snapshot.name }</div>
                    <div className="header-close"  onClick={this.closeWindow}>x</div>
                </div>
                <div closeName="snapshot-body" >
                    <img className="body-img"  src={snapshot.snapshot} type="image/svg+xml"  />
                </div>
            </div>
        );
    }
});
module.exports = SnapShot;