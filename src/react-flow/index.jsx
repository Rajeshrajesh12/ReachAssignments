import React from "react";
import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  initialNodes,
  initialEdges,
  nodeTypes,
  edgeTypes,
} from "./utils/constants";
import { AddNodesMenu } from "./components";

const ReactFlowComp = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: "custom-edge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  return (
    <div className="h-full w-full font-spaceGrotesk">
      <AddNodesMenu setNodes={setNodes} />
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={innerHeight="30px"}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowComp;
