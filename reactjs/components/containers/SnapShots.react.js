var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var SnapShot = require('../base/SnapShot.react');
var WinAppConstants = require('../../constants/WinAppConstants');
var WinAppObjectUtils = require('../../utils/WinAppObjectUtils');

var isNull  = WinAppObjectUtils.isNull;
var SnapShots = React.createClass({
  getInitialState: function() {
    return { 
        show:true,
        hover:false,
        snapshot:WinSettingsStore.getSnapShot(),
        display:{
            width:250,
            height:180
        },
        position:{
            left:10,
            bottom:this.props.bottom?this.props.bottom:3
        }
    };
  },
  setTimeOut:function(){
      return;
      var _self = this;
      if(this.state.timeout){
          clearTimeout(this.state.timeout);
      }
      var timeoutId = setTimeout(function(){
        if(!_self.state.hover){
            _self.setState({
                show:false,
                timeout:null
            });
        }
    },3000);
      this.setState({
        show:true,
        timeout:timeoutId
    });
  },
  componentDidMount: function() {
    this.setTimeOut();
    WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.SNAPSHOTS,this._onChange);
  },
  componentWillUnmount: function() {
    WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.SNAPSHOTS,this._onChange);
  },
  _onChange:function(){
    this.setTimeOut();
    this.setState({
        snapshot:WinSettingsStore.getSnapShot(),
        show:true,
        hover:false
    });
  },
  render: function() {
        if( isNull(this.state.snapshot.app) && this.state.snapshot.snapshots.length==0){
            return (<div style={divStyle}></div>);
        }
      
       var data = this.state.snapshot;
       var position = data.app.position;
       var snapshots = data.snapshots;
       var left = position.left-snapshots.length*this.state.display.width/2;
       left = left<0?10:left;
      
        var divStyle = {
            height:this.state.display.height,
            width:snapshots.length*this.state.display.width,
            position:"absolute",
            left: left,
            bottom:this.state.position.bottom,
            backgroundColor:"rgba(0,124,240,0.5)",
            border:"1px solid #333",
            boxShadow:"inset 0px 0px 3px #fff",
            borderRadius:"5px",
            display:this.state.show?"block":"none",
            boxSizing:"border-box"
        }
        var order = -1;
        return (
            <div style={divStyle}>
                {
                    this.state.snapshot.snapshots.map(function(result) {
                        order+=1;
                        result.name = result.name?result.name:data.app.name;
                        result.image = result.image?result.image:data.app.image;
                        return <SnapShot key={ result.id }  order={order} snapshot={result} />;
                    })
                }
            </div>
        );
  }
});
module.exports = SnapShots;
