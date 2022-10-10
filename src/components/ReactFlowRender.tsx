import Container from "react-bootstrap/Container";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import { nodetypes } from './NodeTypes'
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/Stack";
import ReactFlow, {
    Background,
    BackgroundVariant,
    MiniMap,
    Controls
  } from "react-flow-renderer";
import { Children, useState } from "react";
import { type } from "os";

type newNode = {id: string, 
    data:object, 
    type: string,
    position: object
    }

const ReactFlowTsla: React.FC = () => {
    const [elements,setElements] = useState<newNode[]>([])
    const [name,setName] = useState("")
    const addShopHandler = () => {
        const newNode: newNode =  {
          id: `${Date.now()}`,
          data: { label: `${name}` },
          type: "shop",
          position: {
            x: 0,
            y: 0
          }
        };
        newNode.data = { ...newNode.data, id: newNode.id };
    
        setElements((prev: any) => {
          return [...prev, newNode];
        });
        setName("");
      };
    return (
        <div>
        <Container 
            className="p-3"
            //fluid = 'md'
            style={{height: "75vh",
            //width: "100vw",
            border: "1px solid black",
            marginBottom: "1.0vw",
            // marginTop: "3.5vh",
            // marginLeft: "11.5vw"
            }}
        >
            
            <ReactFlow
                elements={elements}
                nodeTypes={nodetypes}

            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={15} 
                    size={1} 
                    color="red"
                    //color="#c8c8c8" 
                />
                <MiniMap />
                <Controls />
                
            </ReactFlow>
            
        </Container>
        <Container>
            <Stack direction="horizontal" gap={1}>
            <Button onClick={addShopHandler}>Add Shop</Button>
            </Stack>
        </Container>
        
        </div>
    )
} ;

export default ReactFlowTsla!;