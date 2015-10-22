var HoverMixin = {
        getInitialState: function() {
            return {
                hover:false
            }
        },
        handleHover:function(e){
            if(this._handleHover) this._handleHover(e);
            this.setState({hover:true});
        },
        handleUnhover:function(e){
            if(this._handleUnhover) this._handleUnhover(e);
            this.setState({hover:false});
        }
}
module.exports = HoverMixin;