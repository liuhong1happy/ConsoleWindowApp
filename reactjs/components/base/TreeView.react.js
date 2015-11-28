var React = require('react');
var TreeItem = require('./TreeItem.react');
var TreeView = React.createClass({
    render:function(){
        var   genTree = function(root){
            var imgStyle = {
                    "backgroundImage":"url("+root.image+")",
            }    
            if(root.children){
                    return (<TreeItem item={root}>
                                    <div className="tree-children">
                                    {
                                        root.children.map(function(ele){
                                            return genTree(ele);
                                        })
                                    }
                                    </div>
                                </TreeItem>)
            }else{
                return (<TreeItem item={root}/>)
            }
        };
        var root = this.props.root;
        var tree = genTree(root);
        return (<div className="tree-view">
                        {tree}
                </div>)
    }
})
        
module.exports = TreeView;