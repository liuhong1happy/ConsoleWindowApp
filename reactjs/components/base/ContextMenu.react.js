/**
* buttons: 按钮 { name:"",content:"",icon:""}
* className: css类名
* style: 元素样式
**/

var React = require('react');
var ReactDOM = require('react-dom');

var ContextMenu = React.createClass({
    getInitialState:function(){
        return {
            position:{x:0,y:0}
        }  
    },
    open:function(position){
        var root = ReactDOM.findDOMNode(this.refs.root);
        $(root).show();
        this.setState({
            position:position
        });
    },
    close:function(){
        var root = ReactDOM.findDOMNode(this.refs.root);
        $(root).hide();
    },
    render:function(){
        var props = this.props;
        var buttons = props.buttons;
        var position = this.state.position;
        var posStyle = { "left": position.x, "top": position.y }
        var menuStyle = $.extend({},props.style,posStyle);
        return (<div ref="root" className={"context-menu"+(props.className?" "+props.className:"")} style={menuStyle}>
                {
                    buttons.map(function(ele,pos){
                        return (<div key={pos} className="menu-item" onClick={ele.onClick}>
                                    <img src={ele.icon} height={24} width={24}/>
                                    <span>{ele.content}</span>
                                </div>)
                    })
                }
                </div>)
    }
})

module.exports = ContextMenu;