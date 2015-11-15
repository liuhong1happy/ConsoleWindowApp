var React = require('react');

var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');
var SnapShot = React.createClass({
    getInitialState: function() {
        return {
            order:this.props.order?this.props.order:0,
            window:this.props.snapshot
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
        var _window = this.state.window;
        if(!_window){
            return (<div></div>)
        }
        var parentStyle = {
            left:this.state.order*250
        }
        
        return (
            <div className="snapshot" style={parentStyle} onMouseEnter={this.handleHover}  onMouseLeave={this.handleUnhover} onClick={this.showWindow}>
                <div className="snapshot-header" >
                    <img className="header-img" src={_window.image} />
                    <div  className="header-title" >{ _window.name }</div>
                    <div className="header-close"  onClick={this.closeWindow}>x</div>
                </div>
                <div closeName="snapshot-body" >
                    <img className="body-img"  src={_window.snapshot} type="image/svg+xml"  />
                </div>
            </div>
        );
    }
});
module.exports = SnapShot;