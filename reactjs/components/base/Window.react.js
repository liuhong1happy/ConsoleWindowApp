var React = require('react');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');
var Window = React.createClass({
        getInitialState: function() {
            return { 
                hover:{
                    minbutton:false,
                    maxbutton:false,
                    closebutton:false
                },
                display:{
                    height:this.props.height?this.props.height:100,
                    width:this.props.width?this.props.width:100
                },
                position:{
                    x:this.props.position.x?this.props.position.x:0,
                    y:this.props.position.y?this.props.position.y:0
                },
                where:this.props.where?this.props.where:["top","left"]
            };
        },
        onMouseEnter:function(e){
            var hover = {};
            hover[e.target.className] = true;
            this.setState({hover:hover});
        },
        onMouseLeave:function(e){
            var hover = {};
            hover[e.target.className] = false;
            this.setState({hover:hover});
        },
        genSnapShot:function(){
            // 生成snapshot
            var winDom = this.refs.content.getDOMNode();
            var winHtml = winDom.outerHTML;     
            var clientHeight = winDom.clientHeight;
            var clientWidth = winDom.clientWidth;
            var snapshot = "data:image/svg+xml," +
                    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 "+clientWidth+" "+clientHeight+"' width='230px' height='135px'>" +
                    // "<svg xmlns='http://www.w3.org/2000/svg' width='"+clientWidth+"' height='"+clientHeight+"'>" +
                    "<foreignObject width='100%' height='100%'>" +
                    "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +
                        winHtml +
                    "</div>" +
                    "</foreignObject>" +
                    "</svg>";
            return snapshot;
        },
        getEventData:function(){
            return {
                app_id:this.props.app_id,
                id:this.props.id,
                height:this.state.display.height,
                width:this.state.display.width,
                position:{
                    x:this.state.position.x,
                    y:this.state.position.y
                },
                render:"window",
            }
        },
        onClick:function(e){
            switch(e.target.className){
                case "minbutton":
                    var snapshot = this.genSnapShot();
                    var data = this.getEventData();
                    data.show = false;
                    data.snapshot = snapshot;
                    // 传递事件
                    WinSettingsActionCreators.minCustomWindow(data);
                    break;
                case "maxbutton":
                    break;
                case "closebutton":
                    var data = this.getEventData();
                    // 传递事件
                    WinSettingsActionCreators.closeCustomWindow(data);
                    break;
            }
        },
        render: function() {
            var parentStyle = {
                cursor:"pointer",
                borderRadius:"10px 10px 5px 5px",
                backgroundColor:"rgba(0,120,240,0.5)",
                zIndex:999,
                position:"absolute",
                width:this.state.display.width,
                height:this.state.display.height,
                padding:"40px 10px 10px 10px",
                border:"1px solid #333",
                boxShadow:"inset 0px 0px 3px #fff",
                overflow:"hidden",
                top:this.state.position.y,
                left:this.state.position.x,
                display:this.props.show?"inline-block":"none"
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
                height:20,
                width:130
            };
            var minButtonStyle = {
                width:32,
                display:"inline-block",
                textAlign:"center",
                lineHeight:"20px",
                color:"#fff",
                border:"1px solid #333",
                borderTop:"0px solid transparent",
                borderBottomLeftRadius:"5px",
                boxShadow:this.state.hover.minbutton?
                "0px 0px 20px #fff,inset 0px 0px 10px #fff"
                :"0px 0px 3px #fff,inset 0px 0px 3px #fff",
                background:this.state.hover.minbutton?
                "linear-gradient(rgba(0,120,240,0.3) 0%,rgba(0,120,240,0.1) 40%,rgba(0,120,240,1) 41%,rgba(0,120,240,0.6) 100%)"
                :"linear-gradient(rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.1) 40%,rgba(0,120,240,0.7) 41%,rgba(0,120,240,0.3) 100%)"
            };
            var maxButtonStyle = {
                width:32,
                display:"inline-block",
                textAlign:"center",
                lineHeight:"20px",
                color:"#fff",
                margin:"1px",
                borderBottom:"1px solid #333",
                 boxShadow:this.state.hover.maxbutton?
                "0px 0px 20px #fff,inset 0px 0px 10px #fff"
                :"0px 0px 3px #fff,inset 0px 0px 3px #fff",
                background:this.state.hover.maxbutton?
                "linear-gradient(rgba(0,120,240,0.3) 0%,rgba(0,120,240,0.1) 40%,rgba(0,120,240,1) 41%,rgba(0,120,240,0.6) 100%)"
                :"linear-gradient(rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.1) 40%,rgba(0,120,240,0.7) 41%,rgba(0,120,240,0.3) 100%)"
            };
            var closeButtonStyle = {
                width:60,
                display:"inline-block",
                textAlign:"center",
                lineHeight:"20px",
                color:"#fff",
                border:"1px solid #333",
                borderTop:"0px solid transparent",
                borderBottomRightRadius:"5px",
                boxShadow:this.state.hover.closebutton?
                "0px 0px 20px #fff,inset 0px 0px 10px #fff"
                :"0px 0px 3px #fff,inset 0px 0px 3px #fff",
                background:"linear-gradient(rgba(240,0,120,0.8) 0%,rgba(240,0,120,0.6) 40%,rgba(240,0,120,1) 41%,rgba(240,0,120,0.6) 100%)"
            };
            return (
                <div style={parentStyle} ref="content">
                    <div style={buttonsStyle}>
                        <div style={minButtonStyle} ref="minbutton" className="minbutton"
                            onMouseEnter={this.onMouseEnter} 
                            onMouseLeave={this.onMouseLeave} 
                            onClick={this.onClick}
                        >一</div>
                        <div style={maxButtonStyle} ref="maxbutton" className="maxbutton"
                            onMouseEnter={this.onMouseEnter} 
                            onMouseLeave={this.onMouseLeave} 
                        >口</div>
                        <div style={closeButtonStyle} ref="closebutton" className="closebutton"
                            onMouseEnter={this.onMouseEnter} 
                            onMouseLeave={this.onMouseLeave} 
                            onClick={this.onClick}
                        >X</div> 
                    </div>
                    <div style={contentStyle} >
                            {this.props.children}
                    </div>
                </div>
            );
        }
});
module.exports = Window;
