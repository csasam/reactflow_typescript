import Container from "react-bootstrap/Container";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import { nodetypes } from './NodeTypes'
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/Stack";
import DragNode from "./DragNode";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  BackgroundVariant,
  Background,
  Edge,
  Node
} from 'reactflow';
import 'reactflow/dist/style.css';
//import './ReactFlowRender.css';
import React, { useState, 
  useRef, useCallback } from 'react';


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow:React.FC = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event:any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      console.log(type)
      //console.log({...event.dataTransfer})

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode:any = {
        id: getId(),
        type:{type},
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
      <ReactFlowProvider>
        <Container className='p-3' style={{
              height: "70vh",
              width: "90vw",
              border: "1px solid black",
              marginBottom: "1vw"
          }}
          ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background 
              variant={BackgroundVariant.Dots}
              gap={15} 
              size={1} 
              color="red"
            />
            <Controls />
          </ReactFlow>
          
        </Container>
        <DragNode />
        
      </ReactFlowProvider>
      
  );
};

export default DnDFlow;