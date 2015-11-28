var React = require('react');
var TreeItem = React.createClass({
      getInitialState: function() {
            return { 
                item:this.props.item,
            };
    },
    onToggle:function(e){
        var show = !this.props.show;
        var item = this.state.item;
        if(this.props.onToggle){
            item.show = show;
            this.props.onToggle(item)   
        }
        e.stopPropagation();
    },
    onFocus:function(e){
        var focus = !this.props.focus;
        var item = this.state.item;
        if(this.props.onFocus){
            item.focus = focus;
            this.props.onFocus(item)   
        }
        e.stopPropagation();
    },
    render:function(){
        var item = this.state.item;
        var show = this.props.show;
        var focus = this.props.focus;
        var imgStyle = {
                "backgroundImage":"url("+item.image+")",
        }    
        return (<div className={item.name}>
                                <div className={"tree-name"+(focus?" active":"")} onClick={this.onFocus}>
                                    <span className={ show?"toggle-show":"toggle-hidden" } onClick={this.onToggle}></span>
                                    <span className="tree-img" style={imgStyle}></span>
                                    <span>{item.label}</span>
                                </div>
                                 <div className="tree-content" style={{"display": show?"block":"none"}}>
                                            {this.props.children}
                                 </div>
                        </div>)
    }
})
        


module.exports = TreeItem;