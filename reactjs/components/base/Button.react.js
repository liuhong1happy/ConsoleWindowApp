var React = require("react")
var Button = React.createClass({
        render: function() {
            _className = this.props.className?this.props.className:"btn";
            return (
                <div className={_className}  style={this.props.style} 
                onMouseEnter = {this.props.onMouseEnter}
                onMouseLeave= {this.props.onMouseLeave}
                onClick={this.props.onClick}>
                        {this.props.children}
                </div>
            );
        }
    });
module.exports = Button;