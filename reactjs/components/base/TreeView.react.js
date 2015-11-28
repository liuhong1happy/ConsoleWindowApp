var React = require('react');
var TreeItem = require('./TreeItem.react');
var TreeView = React.createClass({
      getInitialState: function() {
            return { 
                lastFocus:null,
                curToggle:null,
                curFocus:null
            };
    },
    handleToggle:function(item){
        var curToggle = item;
        this.setState({  curToggle:item });
    },
    handleFocus:function(item){
        var lastFocus = this.state.curFocus;
        var curFocus = item;

        this.setState({
            lastFocus:lastFocus,
            curFocus:curFocus
        })
        
        if(this.props.onFocus){
             this.props.onFocus(this.props.root,item);
        }
    },
    render:function(){
        var lastFocus = this.state.lastFocus,   curFocus=this.state.curFocus,   curToggle=this.state.curToggle, handleToggle=this.handleToggle, handleFocus=this.handleFocus,   canFocus = this.props.active;
        var   genTree = function(root){
            var imgStyle = {
                    "backgroundImage":"url("+root.image+")",
            }    
            if(lastFocus && lastFocus.key==root.key)  root.focus = false;
            if(curFocus && curFocus.key==root.key)  root.focus = true && canFocus;
            if(curToggle && curToggle.key==root.key) root.show = !!curToggle.show;
            
            if(root.children){
                    return (<TreeItem item={root} focus={!!root.focus} show={!!root.show} key={root.key} onToggle={handleToggle} onFocus={handleFocus}>
                                    <div className="tree-children">
                                    {
                                        root.children.map(function(ele){
                                            ele.key = root.key +"-"+ ele.name;
                                            return genTree(ele);
                                        })
                                    }
                                    </div>
                                </TreeItem>)
            }else{
                return (<TreeItem item={root} focus={!!root.focus} show={!!root.show} key={root.key} onFocus={handleFocus}/>)
            }
        };
        var root = this.props.root;
        root.key = root.name;
        var tree = genTree(root);
        return (<div className="tree-view">
                        {tree}
                </div>)
    }
})
        
module.exports = TreeView;