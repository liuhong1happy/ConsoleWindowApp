var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var SnapShot = React.createClass({
    getInitialState: function() {
        return {
            hover:false,
            order:this.props.order?this.props.order:0,
            snapshot:this.props.snapshot,
            window:WinSettingsStore.getWindowById(this.props.snapshot.id)
        };
    },
    handleHover: function() {
        this.setState({hover: true});
    },
    handleUnhover: function() {
        this.setState({hover: false});
    },
    render: function() {
        var snapshot = this.state.snapshot;
        var _window = this.state.window;
        var parentStyle = {
            backgroundColor:this.state.hover?"rgba(0,120,240,0.7)":"transparent",
            margin:"10px 5px 5px 5px",
            height:165,
            width:240,
            cursor:"pointer",
            borderRadius:"5px",
            boxShadow:this.state.hover?"inset 0px 0px 3px #fff":"",
            position:"absolute",
            bottom:0,
            left:this.state.order*250
        }
        var headerStyle = {
            height:28,
            padding:"0px",
            margin:"0px",
        }
        var bodyStyle = {
            height:130,
            width:230,
            textAlign:"center",
            verticalAlign:"middle"
        }
        
        var imgStyle = {
            height:20,
            width:20,
            margin:"5px",
            float:"left"
        }
        var  titleStyle = {
            lineHeight:"30px",
            height:30,
            width:200,
            verticalAlign:"middle",
            display:"inline",
            float:"left",
            color:"#fff",
            fontSize:"12px"
        }
        var snapshotStyle = {
            width:230,
            height:135,
            padding:"0px 5px"
        }
        return (
            <div style={parentStyle} onMouseEnter={this.handleHover}  onMouseLeave={this.handleUnhover} >
                <div style={headerStyle}>
                    <img src={_window.image?_window.image:snapshot.image} style={imgStyle}/>
                    <div style={titleStyle}>{ _window.name?_window.name:snapshot.name }</div>
                </div>
                <div style={bodyStyle}>
                    <img  src={snapshot.snapshot} type="image/svg+xml" style={snapshotStyle} />
                </div>
            </div>
        );
    }
});
module.exports = SnapShot;