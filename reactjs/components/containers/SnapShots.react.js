var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var SnapShot = require('../base/SnapShot.react');
var WinAppConstants = require('../../constants/WinAppConstants');
var WinAppObjectUtils = require('../../utils/WinAppObjectUtils');
var isNull  = WinAppObjectUtils.isNull;
var SnapShots = React.createClass({
    getInitialState: function() {
    return { 
        hover:false,
        show:true,
        snapshot:WinSettingsStore.getSnapShot(),
        display:{
            width:250,
        },
        position:{
            left:10,
            bottom:this.props.bottom?this.props.bottom:3
        }
    };
    },
    setTimeOut:function(){
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
    },1000);
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
    closeSnapShot:function(order){
     this.state.snapshot.snapshots.splice(order,1);
     this.setState({
         snapshot:this.state.snapshot
     });
    },
    handleHover:function(){
        this.setState({hover:true});
    },
    handleUnhover: function() {
        this.setTimeOut();
        this.setState({hover:false});
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
            width:snapshots.length*this.state.display.width,
            left: left,
            bottom:this.state.position.bottom,
            display:this.state.show?"block":"none",
        }
        var order = -1;
        var closeSnapShot = this.closeSnapShot;
        return (
            <div className="snapshots" style={divStyle} onMouseEnter={this.handleHover}  onMouseLeave={this.handleUnhover}>
                {
                    snapshots.map(function(result) {
                        order+=1;
                        var _window = WinSettingsStore.getWindowById(result.id);
                        var snapshot = {
                            type: _window.type,
                            name : _window.name?_window.name:data.app.name,
                            image :_window.image? _window.image:data.app.image,
                            height: _window.height,
                            width:_window.width,
                            id:_window.id,
                            app_id:_window.app_id,
                            position:{
                                x:_window.position.x,
                                y:_window.position.y
                            },
                            snapshot:result.snapshot
                        }
                        return <SnapShot key={ "snapshot"+_window.id }  order={order} snapshot={snapshot}  closeSnapShot={closeSnapShot}
                        />;
                    })
                }
            </div>
        );
  }
});
module.exports = SnapShots;
