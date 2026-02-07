
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Component } from '../types';

interface Props {
  components: Component[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  contextMap?: Record<string, string>;
}

const PCBRenderer: React.FC<Props> = ({ components, selectedId, onSelect, contextMap = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070A10);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000
    );
    // Adjusted initial position for better overview
    camera.position.set(100, 150, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false; // Ensure auto-rotate is off by default

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 200, 100);
    scene.add(directionalLight);

    const boardGeom = new THREE.BoxGeometry(160, 1.6, 120);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x0A0A0A, roughness: 0.2, metalness: 0.1 });
    const board = new THREE.Mesh(boardGeom, boardMat);
    board.position.y = -0.8;
    scene.add(board);

    const grid = new THREE.GridHelper(400, 40, 0x222222, 0x111111);
    grid.position.y = -1;
    scene.add(grid);

    scene.add(groupRef.current);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateMouse = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateMouse(event);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(groupRef.current.children);

      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        setHoveredId(id);

        // Project to screen
        const vector = new THREE.Vector3();
        intersects[0].object.getWorldPosition(vector);
        vector.project(camera);

        const rect = containerRef.current!.getBoundingClientRect();
        setLabelPos({
          x: (vector.x + 1) * rect.width / 2,
          y: -(vector.y - 1) * rect.height / 2
        });

        // Change cursor to pointer if interactive
        containerRef.current!.style.cursor = 'pointer';
      } else {
        setHoveredId(null);
        containerRef.current!.style.cursor = 'default';
      }
    };

    const handleClick = (event: MouseEvent) => {
      updateMouse(event);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(groupRef.current.children);
      if (intersects.length > 0) {
        onSelect(intersects[0].object.userData.id);
      } else {
        onSelect(null);
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('click', handleClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('click', handleClick);
      renderer.dispose();
      // Clean up geometry/materials to avoid leaks?
    };
  }, []);

  useEffect(() => {
    groupRef.current.clear();
    components.forEach((comp) => {
      let geometry;
      if (comp.type.includes('IC')) {
        geometry = new THREE.BoxGeometry(12, 4, 12);
      } else if (comp.type.includes('Resistor') || comp.type.includes('Capacitor')) {
        geometry = new THREE.BoxGeometry(4, 2, 2);
      } else {
        geometry = new THREE.CylinderGeometry(4, 4, 5, 32);
      }

      const isSelected = comp.id === selectedId;
      const isHovered = comp.id === hoveredId;

      // Highlight if has context
      const hasContext = contextMap[comp.id];

      const material = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x0038DF : (hasContext ? 0x00A8E8 : (isHovered ? 0x555555 : 0x777777)),
        emissive: hasContext ? 0x0038DF : 0x000000,
        emissiveIntensity: hasContext ? 0.2 : 0,
        metalness: 0.7,
        roughness: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(comp.position.x, comp.position.y, comp.position.z);
      mesh.rotation.y = comp.rotation * (Math.PI / 180);
      mesh.userData = { id: comp.id };

      groupRef.current.add(mesh);
    });
  }, [components, selectedId, hoveredId, contextMap]);

  // Find hovered component details
  const hoveredComponent = components.find(c => c.id === hoveredId);
  const contextDescription = hoveredId ? contextMap[hoveredId] : null;

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {hoveredId && hoveredComponent && (
        <div
          className="absolute pointer-events-none z-50 transform -translate-x-1/2 -translate-y-[80px] animate-in fade-in zoom-in-95 duration-200"
          style={{ left: labelPos.x, top: labelPos.y }}
        >
          <div className="flex flex-col bg-[#101422ee] backdrop-blur-md border border-[#ffffff1a] rounded-[10px] p-2 shadow-xl min-w-[120px]">
            {contextDescription && (
              <div className="mb-1 pb-1 border-b border-[#ffffff1a]">
                <span className="text-[10px] font-bold text-[#3EE28B] uppercase tracking-wider block">AI Context</span>
                <p className="text-[11px] text-[#EAF0FF] leading-tight">{contextDescription}</p>
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-[#BBBBBB]">{hoveredComponent.name}</span>
              <span className="text-[9px] text-[#555555] bg-[#ffffff0a] px-1 rounded">{hoveredComponent.type}</span>
            </div>
          </div>

          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#ffffff1a] mx-auto mt-[-1px]" />
        </div>
      )}
    </div>
  );
};

export default PCBRenderer;
