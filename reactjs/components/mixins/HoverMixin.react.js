var HoverMixin = {
        getInitialState: function() {
            return {
                hover:false
            }
        },
        handleHover:function(e){
            this.setState({hover:true});
        },
        handleUnhover:function(e){
            this.setState({hover:false});
        }
}
module.exports = HoverMixin;