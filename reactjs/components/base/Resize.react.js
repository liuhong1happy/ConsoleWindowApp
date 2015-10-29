var React = require('react');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');

var Resize = React.createClass({
        getInitialState: function() {
            return { 
                resizeEvent:{
                    down:false,
                    up:false,
                    downClassName:"",
                    downPosition:{ x:0, y:0},
                    movePosition:{x:0,y:0},
                    upPosition:{x:0,y:0},
                    height:this.props.height?this.props.height:100,
                    width:this.props.width?this.props.width:100,
                    position:{
                        x:this.props.position.x?this.props.position.x:0,
                        y:this.props.position.y?this.props.position.y:0
                    }
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
        onResize:function(){
            var eve = this.state.resizeEvent;
            if(this.props.onResize)
                this.props.onResize(eve);
        },
        getTargetByEvent:function(e){
            e = e || window.event;
            return e.target || e.srcElement;
        },
        getMousePosition:function(e){
            e = e || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            
            var x = e.pageX || e.clientX +scrollX;
            var y = e.pageY || e.clientY +scrollY;
            return {x:x,y:y};
        },
        moveToTop:function(offsetY){
            if(this.state.where[0]=="top"){
                // 改变top也改变height
                this.setState({resizeEvent:{position:{y:this.state.position.y + offsetY}}});
            }
            this.setState({resizeEvent:{height:this.state.display.height + offsetY}});
        },
        moveToBottom:function(offsetY){
            if(this.state.where[0]=="bottom"){
                // 改变bottom也改变height
                this.setState({resizeEvent:{position:{y:this.state.position.y - offsetY}}});
            }
             this.setState({resizeEvent:{height:this.state.display.height + offsetY}});
        },
        moveToLeft:function(offsetX){
            if(this.state.where[1]=="left"){
                // 改变left也改变width
                this.setState({resizeEvent:{position:{x:this.state.position.x + offsetX}}});
            }
            this.setState({resizeEvent:{width:this.state.display.width + offsetX}});
          
        },
        moveToRight:function(offsetX){
            if(this.state.where[1]=="right"){
                // 改变left也改变width
                this.setState({resizeEvent:{position:{x:this.state.position.x - offsetX}}});
            }
            this.setState({resizeEvent:{width:this.state.display.width + offsetX}});
        },
        moveToPositoin:function(e){
            if(this.state.down){
                var className = this.state.downClassName;
                var upPosition = this.getMousePosition(e);
                this.setState({upPosition:upPosition});
                switch(className){
                    case "resize-ns-n":
                        this.moveToTop(upPosition.y - this.state.downPosition.y);
                        break;
                    case "resize-ns-s":
                        this.moveToBottom(upPosition.y - this.state.downPosition.y);
                        break;
                    case "resize-ew-e":
                        this.moveToLeft(upPosition.x - this.state.downPosition.x);
                        break;
                    case "resize-ew-w":
                        this.moveToRight(upPosition.x - this.state.downPosition.x);
                        break;
                    case "resize-se":
                        this.moveToLeft(upPosition.x - this.state.downPosition.x);
                        this.moveToBottom(upPosition.y - this.state.downPosition.y);
                        break;
                    case "resize-sw":
                        this.moveToRight(upPosition.x - this.state.downPosition.x);
                        this.moveToBottom(upPosition.y - this.state.downPosition.y);
                        break;
                    case "resize-ne":
                        this.moveToLeft(upPosition.x - this.state.downPosition.x);
                        this.moveToTop(upPosition.y - this.state.downPosition.y);
                        break;
                    case "resize-nw":
                        this.moveToRight(upPosition.x - this.state.downPosition.x);
                        this.moveToTop(upPosition.y - this.state.downPosition.y);
                        break;

                }
            }
        },
        onMouseDown:function(e){
            var target = this.getTargetByEvent(e);
            switch(target.className){
                case "resize-ns-n":
                case "resize-ns-s":
                case "resize-ew-e":
                case "resize-ew-w":
                case "resize-se":
                case "resize-sw":
                case "resize-ne":
                case "resize-nw":
                    this.setState({
                        down:true,
                        up:false,
                        downClassName:target.className,
                        downPosition:this.getMousePosition(e)
                    });
                    break;
                default:
                    this.setState({
                        down:false,
                        up:false,
                        downClassName:""
                    });
                    break;
            }
        },
        onMouseUp:function(e){
            this.moveToPositoin(e);
            this.setState({resizeEvent:{down:false,up:true,downClassName:""}});
        },
        onMouseMove:function(e){
            this.moveToPositoin(e);
        },
        componentDidMount:function(){
                window.addEventListener("onmousedown",onMouseDown);
                window.addEventListener("onmouseup",onMouseUp);
                window.addEventListener("onmousemove",onMouseMove);
        },
        componentWillUnmount:function(){
                window.removeEventListener("onmousedown",onMouseDown);
                window.removeEventListener("onmouseup",onMouseUp);
                window.removeEventListener("onmousemove",onMouseMove);
        },
        componentDidUpdate:function(){
            this.onResize();
        },
        render: function() {
               var resizeStyle = this.props.style?this.props.style:{};
               return (<div style={resizeStyle}>
                        <div className="resize-ns-n"  onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-ns-s"  onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-ew-e" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-ew-w" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-se" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-sw" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-ne" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                        <div className="resize-nw" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}></div>
                 </div>)
        }
});
module.exports = Resize;