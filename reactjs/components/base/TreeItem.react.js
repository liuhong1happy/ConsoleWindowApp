var React = require('react');
var TreeItem = React.createClass({
    render:function(){
        var item = this.props.item;
        var imgStyle = {
                "backgroundImage":"url("+item.image+")",
        }    
        return (<div className={item.name}>
                                <div className="tree-name">
                                    <span className="toggle-show"></span>
                                    <span className="tree-img" style={imgStyle}></span>
                                    <span>{item.label}</span>
                                </div>
                                {this.props.children}
                        </div>)
    }
})
        


module.exports = TreeItem;