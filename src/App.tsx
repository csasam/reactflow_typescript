import Container from 'react-bootstrap/Container';
import ReactFlowTsla from './components/ReactFlowRender';
import './App.css';

const App = () => {
    console.log("container: ",[Container])
    return (
        <div>
            <Container
            fluid="md"
            style={{backgroundColor:"#ffcccc"}}
            >
                    <h1 
                        className="header"
                        style={{color:"white"}}    
                    >
                        Hello World
                    </h1>
            </Container>
            <ReactFlowTsla />
            
        </div>
    )
};
//console.log([App])
export default App;
