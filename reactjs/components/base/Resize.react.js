var React = require('react');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');

var Window = React.createClass({
        getInitialState: function() {
            return { 
                widow:this.props.widow,
                display:{
                    height:this.props.height,
                    width:this.props.width
                },
                position:{
                    x:this.props.position.x?this.props.position.x:0,
                    y:this.props.position.y?this.props.position.y:0
                },
                where:this.props.where?this.props.where:["top","left"]
            };
        },
        onResize:function(){
            if(this.props.onResize)
                this.props.onResize(this.state.event);
        },
        render: function() {
               return (<div>
                        <div class="resize-ns"></div>
                        <div class="resize-ns"></div>
                        <div class="resize-ns"></div>
                        <div class="resize-ns"></div>
                        <div class="resize-ns"></div>
                        <div class="resize-ns"></div>
                        <div class="resize-ns"></div>
                 </div>)
        }
});
module.exports = Window;