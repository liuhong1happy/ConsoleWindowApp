var React = require('react');
var Window = React.createClass({
        getInitialState: function() {
            return { 
                display:{
                    height:this.props.height?this.props.height:100,
                    width:this.props.width?this.props.width:100
                },
                position:{
                    x:100,
                    y:100
                },
                where:this.props.where?this.props.where:["top","left"]
            };
        },
        render: function() {
            var parentStyle = {
                cursor:"pointer",
                borderRadius:"3px",
                backgroundColor:"rgba(0,120,240,0.5)",
                zIndex:999,
                position:"absolute",
                width:this.state.display.width,
                height:this.state.display.height,
                padding:"48px 10px 10px 10px",
                border:"1px solid #333",
                boxShadow:"inset 0px 0px 3px #fff",
                overflow:"hidden",
                top:this.state.position.y,
                left:this.state.position.x
            };
            var contentStyle = {
                backgroundColor:"#fff",
                width:this.state.display.width,
                height:this.state.display.height,
                border:"1px solid #666",
                boxShadow:"0px 0px 3px #fff"
            };
            var buttonsStyle = {
                position:"absolute",
                top:0,
                left:this.state.display.width-120,
                backgroundColor:"rgba(0,120,240,0.3)",
                height:28,
                width:130
            };
            var minButtonStyle = {
                width:38,
                display:"inline-block",
                textAlign:"center",
                lineHeight:"26px",
                color:"#fff",
                margin:"1px",
                background:"linear-gradient(rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.1) 40%,rgba(0,120,240,0.7) 41%,rgba(0,120,240,0.3) 100%)"
            };
            var maxButtonStyle = {
                width:38,
                display:"inline-block",
                textAlign:"center",
                lineHeight:"26px",
                color:"#fff",
                margin:"1px",
                background:"linear-gradient(rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.1) 40%,rgba(0,120,240,0.7) 41%,rgba(0,120,240,0.3) 100%)"
            };
            var closeButtonStyle = {
                width:48,
                display:"inline-block",
                textAlign:"center",
                lineHeight:"26px",
                color:"#fff",
                margin:"1px",
                background:"linear-gradient(rgba(240,0,0,0.4) 0%,rgba(240,0,0,0.3) 40%,rgba(240,0,0,0.6) 41%,rgba(240,0,0,0.3) 100%)"
            };
            return (
                <div style={parentStyle}>
                    <div style={buttonsStyle}>
                        <div style={minButtonStyle}>一</div>
                        <div style={maxButtonStyle}>口</div>
                        <div style={closeButtonStyle}>X</div> 
                    </div>
                    <div style={contentStyle}>
                            {this.props.children}
                    </div>
                </div>
            );
        }
});
module.exports = Window;