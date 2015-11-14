var React = require('react');
var DesktopButton = React.createClass({
    getInitialState: function() {
        return { 
            button:this.props.button,
            order:this.props.order,
            background:{
                color:"rgba(0,120,240,0.5)"
            },
            display:{
                height:this.props.height?this.props.height:100,
                width:this.props.width?this.props.width:80
            }
        };
    },
    handleClick:function(){
        if(this.props.onClick){
            this.props.onClick(this.state.button.id)
        }  
    },
    render: function() {
        var order = this.state.order;
        var grid = {
                row: parseInt(this.props.parentHeight/this.state.display.height),
                col: parseInt(this.props.parentWidth/this.state.display.width)
        };
        var position = {
            left: parseInt(order/grid.row)*this.state.display.width,
            top: (order%grid.row)*this.state.display.height
        };
        var liStyle = {
            height:this.state.display.height,
            width:this.state.display.width,
            left:position.left,
            top:position.top,
        };
        var imgStyle={ backgroundImage:"url("+this.state.button.image+")"};
        
        return (
            <li style={liStyle} className="desktop-button-container" onClick={ this.handleClick }>
                <div className="desktop-button">
                    <div className="desktop-button-icon" style={imgStyle}></div>
                    <div className="desktop-button-name" >{this.state.button.name}</div>
                </div>
            </li>
        );
    }
}); 
module.exports = DesktopButton;