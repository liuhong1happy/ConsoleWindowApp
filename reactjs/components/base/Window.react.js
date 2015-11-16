var React = require('react');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');
var Resize = require('./Resize.react');
var Window = React.createClass({
        getInitialState: function() {
            return { 
                resize:true,
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
            var winDom = this.refs.winborder.getDOMNode();
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
        onResize:function(e){
            if(!this.state.resize) return;
            
            var $window = this.refs.winborder.getDOMNode();
            var $content = this.refs.wincontent.getDOMNode();
            $window.style.width = e.width+"px";
            $window.style.height = e.height+"px";
            $window.style[this.state.where[1]] = e.position.x+"px";
            $window.style[this.state.where[0]] = e.position.y+"px";

            $content.style.width = e.width+"px";
            $content.style.height = e.height+"px";
            // resize完毕
            if(e.up==true && e.down==false){
                this.setState({
                    display:{
                        height:e.height,
                        width:e.width
                    },
                    position:{
                        x:e.position.x,
                        y: e.position.y
                    }
                });
            }
        },
        onToggleMax:function(e){
                var resize = !this.state.resize;
                this.setState({resize:resize});
        },
        render: function() {
            var parentStyle = {
                width:this.state.resize?this.state.display.width:"auto",
                height:this.state.resize?this.state.display.height:"auto",
                top:this.state.resize?this.state.position.y:0,
                left:this.state.resize?this.state.position.x:0,
                right:this.state.resize?"":0,
                bottom:this.state.resize?"":0,
                display:this.props.show?"inline-block":"none",
            };
            var contentStyle = {
                width:this.state.resize?this.state.display.width:"100%",
                height:this.state.resize?this.state.display.height:"100%",
            };
            var resizeStyle = {
                display:this.state.resize?"block":"none"
            };
            return (
                <div style={parentStyle} ref="winborder" className="win window" >
                    <Resize style={resizeStyle} height={this.state.display.height} width={this.state.display.width} position={this.state.position} onResize={this.onResize} onDoubleClick={this.onToggleMax} where={this.state.where}/>
                    <div className="win-btns">
                        <div ref="minbutton" id="minbutton" className="btn btn-win btn-win-min" onClick={this.onClick}>一</div>
                        <div ref="maxbutton" id="maxbutton" className="btn btn-win btn-win-max" onClick={this.onToggleMax}>口</div>
                        <div ref="closebutton" id="closebutton" className="btn btn-win btn-win-close" onClick={this.onClick}>X</div> 
                    </div>
                    <div ref="wincontent" style={contentStyle} className="win-content">
                            {this.props.children}
                    </div>
                    
                </div>
            );
        }
});
module.exports = Window;
