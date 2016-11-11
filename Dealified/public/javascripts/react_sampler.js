/**
 * Created by Nrsimha on 11/2/16.
 */
class Comment extends React.Component{
    render(){
        return(<div>

        <p><h5>Author:</h5>{this.props.name} <h5>Comment</h5> {this.props.body}</p>
          </div>

        );
    }
}

class AddComment extends React.Component{

    render(){
        return(
            <form onSubmit={this._handleSubmit.bind(this)}>
          <div><input placeholder="Name:" ref={(input) => this._author=input} />
          <textarea placeholder="Comment:" ref={(textarea) => this._comment=textarea} />
          <button type="submit">Submit</button> </div>
        </form>);
    }

    _handleSubmit(event){
        event.preventDefault();
        let author = this._author;
        let comment = this._comment
        this.props.addComment(author.value,comment.value);
    }
}


class RobotBox extends React.Component {

    constructor() {
        super();

        this.state = {
            showComments: false,
            comments : []
        };
    }
    componentWillMount(){
        this._loadComments();
    }


    render() {

        let comments;
        let tag = "Show Comments"
        if(this.state.showComments){

            comments = <div>{this._getComments()}</div>;
            tag = "Hide Comments";

        }

        return (
            <div>
                <AddComment addComment={this._addComment.bind(this)} />
                <h4>Comments</h4> <button onClick={this._handleClick.bind(this)}>{tag}</button>
                {comments}
            </div>
        );
        // let date = new Date();
        // let languages = ["HTML", "JAVASCRIPT", "CSS3"]
        // return (<div><h3>App 1</h3>
        // <p className = "app">Sample 1: {date.toDateString()}</p>
        // <ul>
        //     {languages.map(topic => <li>{topic}</li>)}
        // </ul></div>);
    }
    componentDidMount(){
       this._timer =  setInterval(() => { this._loadComments()}, 5000);
    }

    componentWillUnmount(){

    clearInterval(this._timer);
    }
    _addComment(author, comment){

        // alert(author);
        let newComment ={
            id : this.state.comments.length + 1,
            author: author,
            body: comment
        };

        this.setState({ comments: this.state.comments.concat([newComment]) });
        // alert(this.state.comments[this.state.comments.length -1].author);
    }

    _handleClick(){

        console.log("inside");
        this.setState({
            showComments: !this.state.showComments
        });

    }

    _getComments(){

    return(
        this.state.comments.map((comment) => {
            return(
            <Comment name={comment.author} body={comment.body} key={comment.id}  />);
        })
    );
    }

    _loadComments(){

        jQuery.ajax({
            method:'GET',
            url:'/load',
            success: (comment) => {
                this.setState({comments: comment})
            }
        });

    }
}




let target = document.getElementById('robot-app');

ReactDOM.render( <RobotBox />, target );