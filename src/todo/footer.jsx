export default{
    data(){
        return{
            author:'wangfan'
        }
    },
    render(){
        return(
            <div id="footer">
                <span>written by {this.author}</span>
            </div>
        )
    }
}