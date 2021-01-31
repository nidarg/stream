import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {deleteStream} from '../../actions';
import {fetchStream} from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component{

    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    actions = ()=>{
        return(

         <React.Fragment>
            <button 
                onClick={()=>this.props.deleteStream(this.props.match.params.id)}  
                className='ui negative button'
                >Delete
            </button>
            <Link to = '/'
                //onClick={history.push('/')} 
                className='ui button'>Cancel
            </Link>
        
        </React.Fragment>
        )
    }
        
    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }
        else{
            return `Are you sure you want to delete the stream with title: ${this.props.stream.title} ? `
        }
    }
    render(){
        
        return (
            <Modal
                title = 'Delete Stream'
                content = {this.renderContent()}
                actions = {this.actions()}
                onDismiss={()=>history.push('/')}
            />
        )
    }
    
        
    
}

const mapStateToProps = (state, componentProps)=>{
    return{
        stream:state.streams[componentProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);
