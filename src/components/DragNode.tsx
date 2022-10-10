import { Container, Stack, Button } from "react-bootstrap";
import { NodeTypes } from "reactflow";

export default () => {
  const onDragStart = (event:any, nodeType:string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    
      
      <Stack direction="horizontal" gap={1}>
        
        <Button onDragStart={(event) => onDragStart(event, 'shop')} draggable>
          Shop
        </Button>
        <Button onDragStart={(event) => onDragStart(event, 'vrc')} draggable>
          VRC
        </Button>
        <Button onDragStart={(event) => onDragStart(event, 'buffer')} draggable>
          Buffer
        </Button>
      </Stack>
    
  );
};
