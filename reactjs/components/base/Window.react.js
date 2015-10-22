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
        genSnapShot:function(){
            // 生成snapshot
            var winDom = this.refs.content.getDOMNode();
            var winHtml = winDom.outerHTML;     
            var clientHeight = winDom.clientHeight;
            var clientWidth = winDom.clientWidth;
            var snapshot = "data:image/svg+xml," +
                    "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='xMidYMid meet' viewBox='0 0 "+clientWidth+" "+clientHeight+"' width='230px' height='135px'>" +
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
                type:this.props.type
            }
        },
        onClick:function(e){
            switch(e.target.id){
                case "minbutton":
                    var snapshot = this.genSnapShot();
                    var data = this.getEventData();
                    data.show = false;
                    data.snapshot = snapshot;
                    // 传递事件
                    WinSettingsActionCreators.minWindow(data);
                    break;
                case "maxbutton":
                    break;
                case "closebutton":
                    var data = this.getEventData();
                    // 传递事件
                    WinSettingsActionCreators.closeWindow(data);
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
            return (
                <div style={parentStyle} ref="content">
                    <div style={buttonsStyle}>
                        <div ref="minbutton" id="minbutton" className="btn btn-win btn-win-min" onClick={this.onClick}>一</div>
                        <div ref="maxbutton" id="maxbutton" className="btn btn-win btn-win-max">口</div>
                        <div ref="closebutton" id="closebutton" className="btn btn-win btn-win-close" onClick={this.onClick}>X</div> 
                    </div>
                    <div style={contentStyle} >
                            {this.props.children}
                    </div>
                </div>
            );
        }
});
module.exports = Window;