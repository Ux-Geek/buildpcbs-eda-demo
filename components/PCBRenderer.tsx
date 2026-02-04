
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Component } from '../types';

interface Props {
  components: Component[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const PCBRenderer: React.FC<Props> = ({ components, selectedId, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group>(new THREE.Group());

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
    camera.position.set(100, 100, 150);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(100, 200, 100);
    scene.add(directionalLight);

    // Subtle Board Base
    const boardGeom = new THREE.BoxGeometry(160, 1.6, 120);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1 }); 
    const board = new THREE.Mesh(boardGeom, boardMat);
    board.position.y = -0.8;
    scene.add(board);

    // Subtle Grid
    const grid = new THREE.GridHelper(400, 40, 0x444444, 0x111111);
    grid.position.y = -1;
    scene.add(grid);

    scene.add(groupRef.current);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(groupRef.current.children);

      if (intersects.length > 0) {
        onSelect(intersects[0].object.userData.id);
      } else {
        onSelect(null);
      }
    };

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
      containerRef.current?.removeEventListener('click', handleClick);
      renderer.dispose();
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
      const material = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x0033DF : 0x777777,
        metalness: 0.8,
        roughness: 0.2
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(comp.position.x, comp.position.y, comp.position.z);
      mesh.rotation.y = comp.rotation * (Math.PI / 180);
      mesh.userData = { id: comp.id };
      
      groupRef.current.add(mesh);
    });
  }, [components, selectedId]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default PCBRenderer;
