(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/PCBRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.182.0/node_modules/three/examples/jsm/controls/OrbitControls.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const PCBRenderer = ({ components, selectedId, onSelect })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]());
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [labelPos, setLabelPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PCBRenderer.useEffect": ()=>{
            if (!containerRef.current) return;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            scene.background = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x070A10);
            sceneRef.current = scene;
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 2000);
            camera.position.set(120, 100, 180);
            cameraRef.current = camera;
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: true,
                alpha: true
            });
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;
            const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 0.4);
            scene.add(ambientLight);
            const directionalLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 0.8);
            directionalLight.position.set(100, 200, 100);
            scene.add(directionalLight);
            const boardGeom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](160, 1.6, 120);
            const boardMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: 0x0A0A0A,
                roughness: 0.2,
                metalness: 0.1
            });
            const board = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](boardGeom, boardMat);
            board.position.y = -0.8;
            scene.add(board);
            const grid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridHelper"](400, 40, 0x222222, 0x111111);
            grid.position.y = -1;
            scene.add(grid);
            scene.add(groupRef.current);
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const updateMouse = {
                "PCBRenderer.useEffect.updateMouse": (event)=>{
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
                    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                }
            }["PCBRenderer.useEffect.updateMouse"];
            const handleMouseMove = {
                "PCBRenderer.useEffect.handleMouseMove": (event)=>{
                    updateMouse(event);
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(groupRef.current.children);
                    if (intersects.length > 0) {
                        const id = intersects[0].object.userData.id;
                        setHoveredId(id);
                        // Project to screen
                        const vector = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                        intersects[0].object.getWorldPosition(vector);
                        vector.project(camera);
                        const rect = containerRef.current.getBoundingClientRect();
                        setLabelPos({
                            x: (vector.x + 1) * rect.width / 2,
                            y: -(vector.y - 1) * rect.height / 2
                        });
                    } else {
                        setHoveredId(null);
                    }
                }
            }["PCBRenderer.useEffect.handleMouseMove"];
            const handleClick = {
                "PCBRenderer.useEffect.handleClick": (event)=>{
                    updateMouse(event);
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(groupRef.current.children);
                    if (intersects.length > 0) {
                        onSelect(intersects[0].object.userData.id);
                    } else {
                        onSelect(null);
                    }
                }
            }["PCBRenderer.useEffect.handleClick"];
            containerRef.current.addEventListener('mousemove', handleMouseMove);
            containerRef.current.addEventListener('click', handleClick);
            const animate = {
                "PCBRenderer.useEffect.animate": ()=>{
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                }
            }["PCBRenderer.useEffect.animate"];
            animate();
            const handleResize = {
                "PCBRenderer.useEffect.handleResize": ()=>{
                    if (!containerRef.current) return;
                    camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
                }
            }["PCBRenderer.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "PCBRenderer.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    containerRef.current?.removeEventListener('mousemove', handleMouseMove);
                    containerRef.current?.removeEventListener('click', handleClick);
                    renderer.dispose();
                }
            })["PCBRenderer.useEffect"];
        }
    }["PCBRenderer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PCBRenderer.useEffect": ()=>{
            groupRef.current.clear();
            components.forEach({
                "PCBRenderer.useEffect": (comp)=>{
                    let geometry;
                    if (comp.type.includes('IC')) {
                        geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](12, 4, 12);
                    } else if (comp.type.includes('Resistor') || comp.type.includes('Capacitor')) {
                        geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](4, 2, 2);
                    } else {
                        geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](4, 4, 5, 32);
                    }
                    const isSelected = comp.id === selectedId;
                    const isHovered = comp.id === hoveredId;
                    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        color: isSelected ? 0x0038DF : isHovered ? 0x333333 : 0x777777,
                        metalness: 0.7,
                        roughness: 0.3
                    });
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$182$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
                    mesh.position.set(comp.position.x, comp.position.y, comp.position.z);
                    mesh.rotation.y = comp.rotation * (Math.PI / 180);
                    mesh.userData = {
                        id: comp.id
                    };
                    groupRef.current.add(mesh);
                }
            }["PCBRenderer.useEffect"]);
        }
    }["PCBRenderer.useEffect"], [
        components,
        selectedId,
        hoveredId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full h-full relative",
        children: hoveredId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute pointer-events-none z-50 transform -translate-x-1/2 -translate-y-[80px] animate-in fade-in zoom-in-95 duration-200",
            style: {
                left: labelPos.x,
                top: labelPos.y
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex bg-[#101422ee] backdrop-blur-md border border-[#ffffff1a] rounded-[10px] p-1 gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "px-3 py-1.5 rounded-[6px] text-[11px] font-bold text-white hover:bg-[#ffffff1a] transition-colors pointer-events-auto",
                            children: "EDIT"
                        }, void 0, false, {
                            fileName: "[project]/src/components/PCBRenderer.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-px h-4 bg-[#ffffff1a] self-center"
                        }, void 0, false, {
                            fileName: "[project]/src/components/PCBRenderer.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "px-3 py-1.5 rounded-[6px] text-[11px] font-bold text-[#BBBBBB] hover:bg-[#ffffff1a] transition-colors pointer-events-auto",
                            children: "COPY"
                        }, void 0, false, {
                            fileName: "[project]/src/components/PCBRenderer.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PCBRenderer.tsx",
                    lineNumber: 174,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#ffffff1a] mx-auto"
                }, void 0, false, {
                    fileName: "[project]/src/components/PCBRenderer.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PCBRenderer.tsx",
            lineNumber: 170,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/PCBRenderer.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PCBRenderer, "/zBgt72FU3ie3j0MElv8A75tc1U=");
_c = PCBRenderer;
const __TURBOPACK__default__export__ = PCBRenderer;
var _c;
__turbopack_context__.k.register(_c, "PCBRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/geminiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processPrompt",
    ()=>processPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@google+genai@1.40.0/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
;
// Initialize lazily or with dummy to prevent crash on load
const getAiClient = ()=>{
    const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GEMINI_API_KEY || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_KEY || 'dummy-key';
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
        apiKey
    });
};
const PCB_SCHEMA = {
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
    properties: {
        intent: {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING,
            description: 'The summarized intent of the user action.'
        },
        description: {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING,
            description: 'User-friendly description of what was changed.'
        },
        components: {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].ARRAY,
            items: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                properties: {
                    id: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING
                    },
                    name: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING
                    },
                    type: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING
                    },
                    value: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING
                    },
                    package: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING
                    },
                    position: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
                        properties: {
                            x: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER
                            },
                            y: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER
                            },
                            z: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER
                            }
                        },
                        required: [
                            'x',
                            'y',
                            'z'
                        ]
                    },
                    rotation: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER
                    },
                    net: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$40$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING
                    }
                },
                required: [
                    'id',
                    'name',
                    'type',
                    'position'
                ]
            }
        }
    },
    required: [
        'intent',
        'description',
        'components'
    ]
};
const processPrompt = async (prompt, currentComponents)=>{
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `
        You are an expert PCB designer. 
        Current board state components: ${JSON.stringify(currentComponents)}
        User request: "${prompt}"
        
        Update the PCB layout based on the request. 
        Add, move, or modify components as needed. 
        Provide a summary of the change and the full new component list.
      `,
            config: {
                responseMimeType: "application/json",
                responseSchema: PCB_SCHEMA
            }
        });
        const data = JSON.parse(response.text || '{}');
        const change = {
            id: Math.random().toString(36).substr(2, 9),
            intent: data.intent,
            description: data.description,
            affectedItems: data.components.map((c)=>c.name),
            status: 'applied',
            timestamp: new Date()
        };
        return {
            change,
            updatedComponents: data.components
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PCBRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PCBRenderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/geminiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.563.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const Logo = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100",
        height: "23",
        viewBox: "0 0 100 23",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "opacity-90",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "0.637891",
                y: "0.637402",
                width: "25.075",
                height: "21.675",
                fill: "#0038DF"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "0.637891",
                y: "0.637402",
                width: "25.075",
                height: "21.675",
                stroke: "black",
                strokeWidth: "1.275"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M1.27539 21.6748V11.309H6.92285L10.9567 4.6748L15.7974 17.9431L19.8313 11.7236H25.0754V21.6748H1.27539Z",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13.1758 11.4748L10.6258 4.6748L6.37578 11.4748H2.12578",
                stroke: "black",
                strokeWidth: "1.7",
                strokeLinecap: "square"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13.1758 11.4749L15.7258 18.2749L19.9758 11.4749H24.2258",
                stroke: "black",
                strokeWidth: "1.7",
                strokeLinecap: "square"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M35.9062 17.6789C35.4415 17.6789 35.0165 17.6109 34.6312 17.4749C34.2572 17.3502 33.9285 17.1745 33.6452 16.9479C33.3619 16.7212 33.1239 16.4605 32.9312 16.1659L32.7612 17.4749H31.2312V5.23485H32.9312V10.2499C33.2032 9.81919 33.5829 9.45652 34.0702 9.16185C34.5689 8.85585 35.1809 8.70285 35.9062 8.70285C36.7222 8.70285 37.4419 8.90119 38.0652 9.29785C38.6885 9.68319 39.1702 10.2159 39.5102 10.8959C39.8615 11.5645 40.0372 12.3352 40.0372 13.2079C40.0372 14.0579 39.8615 14.8229 39.5102 15.5029C39.1702 16.1829 38.6885 16.7155 38.0652 17.1009C37.4419 17.4862 36.7222 17.6789 35.9062 17.6789ZM35.6342 16.1999C36.1555 16.1999 36.6145 16.0752 37.0112 15.8259C37.4192 15.5765 37.7365 15.2252 37.9632 14.7719C38.2012 14.3185 38.3202 13.7915 38.3202 13.1909C38.3202 12.5902 38.2012 12.0689 37.9632 11.6269C37.7365 11.1735 37.4192 10.8222 37.0112 10.5729C36.6145 10.3122 36.1555 10.1819 35.6342 10.1819C35.1015 10.1819 34.6312 10.3122 34.2232 10.5729C33.8265 10.8222 33.5149 11.1735 33.2882 11.6269C33.0615 12.0689 32.9482 12.5902 32.9482 13.1909C32.9482 13.7915 33.0615 14.3185 33.2882 14.7719C33.5149 15.2252 33.8265 15.5765 34.2232 15.8259C34.6312 16.0752 35.1015 16.1999 35.6342 16.1999ZM44.4872 17.6789C43.8185 17.6789 43.2349 17.5429 42.7362 17.2709C42.2489 16.9989 41.8692 16.5909 41.5972 16.0469C41.3365 15.5029 41.2062 14.8172 41.2062 13.9899V8.90685H42.9062V13.8029C42.9062 14.6075 43.0819 15.2139 43.4332 15.6219C43.7845 16.0299 44.2889 16.2339 44.9462 16.2339C45.3882 16.2339 45.7849 16.1262 46.1362 15.9109C46.4989 15.6955 46.7822 15.3839 46.9862 14.9759C47.1902 14.5679 47.2922 14.0692 47.2922 13.4799V8.90685H48.9922V17.4749H47.4792L47.3602 16.0129C47.0995 16.5342 46.7199 16.9422 46.2212 17.2369C45.7225 17.5315 45.1445 17.6789 44.4872 17.6789ZM50.7587 17.4749V8.90685H52.4587V17.4749H50.7587ZM51.6257 7.29185C51.2971 7.29185 51.0251 7.18985 50.8097 6.98585C50.6057 6.78185 50.5037 6.52119 50.5037 6.20385C50.5037 5.89785 50.6057 5.64852 50.8097 5.45585C51.0251 5.25185 51.2971 5.14985 51.6257 5.14985C51.9431 5.14985 52.2094 5.25185 52.4247 5.45585C52.6401 5.64852 52.7477 5.89785 52.7477 6.20385C52.7477 6.52119 52.6401 6.78185 52.4247 6.98585C52.2094 7.18985 51.9431 7.29185 51.6257 7.29185ZM54.2097 17.4749V5.23485H55.9097V17.4749H54.2097ZM61.3719 17.6789C60.5559 17.6789 59.8363 17.4862 59.2129 17.1009C58.5896 16.7042 58.1023 16.1715 57.7509 15.5029C57.4109 14.8229 57.2409 14.0522 57.2409 13.1909C57.2409 12.3182 57.4109 11.5475 57.7509 10.8789C58.1023 10.2102 58.5896 9.68319 59.2129 9.29785C59.8476 8.90119 60.5729 8.70285 61.3889 8.70285C62.0576 8.70285 62.6469 8.83885 63.1569 9.11085C63.6669 9.37152 64.0636 9.74552 64.3469 10.2329V5.23485H66.0469V17.4749H64.5169L64.3469 16.1489C64.1769 16.4095 63.9559 16.6589 63.6839 16.8969C63.4119 17.1235 63.0833 17.3105 62.6979 17.4579C62.3126 17.6052 61.8706 17.6789 61.3719 17.6789ZM61.6439 16.1999C62.1766 16.1999 62.6469 16.0752 63.0549 15.8259C63.4629 15.5765 63.7746 15.2252 63.9899 14.7719C64.2166 14.3185 64.3299 13.7915 64.3299 13.1909C64.3299 12.5902 64.2166 12.0689 63.9899 11.6269C63.7746 11.1735 63.4629 10.8222 63.0549 10.5729C62.6469 10.3122 62.1766 10.1819 61.6439 10.1819C61.1339 10.1819 60.6749 10.3122 60.2669 10.5729C59.8589 10.8222 59.5416 11.1735 59.3149 11.6269C59.0883 12.0689 58.9749 12.5902 58.9749 13.1909C58.9749 13.7915 59.0883 14.3185 59.3149 14.7719C59.5416 15.2252 59.8589 15.5765 60.2669 15.8259C60.6749 16.0752 61.1339 16.1999 61.6439 16.1999ZM67.6915 21.2149V8.90685H69.2215L69.3915 10.2329C69.5729 9.97219 69.7995 9.72852 70.0715 9.50185C70.3435 9.26385 70.6665 9.07119 71.0405 8.92385C71.4259 8.77652 71.8735 8.70285 72.3835 8.70285C73.1995 8.70285 73.9135 8.90119 74.5255 9.29785C75.1489 9.69452 75.6305 10.2329 75.9705 10.9129C76.3219 11.5815 76.4975 12.3465 76.4975 13.2079C76.4975 14.0692 76.3219 14.8399 75.9705 15.5199C75.6192 16.1885 75.1319 16.7155 74.5085 17.1009C73.8965 17.4862 73.1825 17.6789 72.3665 17.6789C71.6979 17.6789 71.1085 17.5485 70.5985 17.2879C70.0885 17.0159 69.6862 16.6419 69.3915 16.1659V21.2149H67.6915ZM72.0945 16.1999C72.6159 16.1999 73.0749 16.0752 73.4715 15.8259C73.8795 15.5765 74.1969 15.2252 74.4235 14.7719C74.6615 14.3185 74.7805 13.7915 74.7805 13.1909C74.7805 12.5902 74.6615 12.0689 74.4235 11.6269C74.1969 11.1735 73.8795 10.8222 73.4715 10.5729C73.0749 10.3122 72.6159 10.1819 72.0945 10.1819C71.5619 10.1819 71.0915 10.3122 70.6835 10.5729C70.2869 10.8222 69.9752 11.1735 69.7485 11.6269C69.5219 12.0689 69.4085 12.5902 69.4085 13.1909C69.4085 13.7915 69.5219 14.3185 69.7485 14.7719C69.9752 15.2252 70.2869 15.5765 70.6835 15.8259C71.0915 16.0752 71.5619 16.1999 72.0945 16.1999ZM82.4776 17.6789C82.0129 17.6789 81.5879 17.6109 81.2026 17.4749C80.8286 17.3502 80.4999 17.1745 80.2166 16.9479C79.9332 16.7212 79.6952 16.4605 79.5026 16.1659L79.3326 17.4749H77.8026V5.23485H79.5026V10.2499C79.7746 9.81919 80.1542 9.45652 80.6416 9.16185C81.1402 8.85585 81.7522 8.70285 82.4776 8.70285C83.2936 8.70285 84.0132 8.90119 84.6366 9.29785C85.2599 9.68319 85.7416 10.2159 86.0816 10.8959C86.4329 11.5645 86.6086 12.3352 86.6086 13.2079C86.6086 14.0579 86.4329 14.8229 86.0816 15.5029C85.7416 16.1829 85.2599 16.7155 84.6366 17.1009C84.0132 17.4862 83.2936 17.6789 82.4776 17.6789ZM82.2056 16.1999C82.7269 16.1999 83.1859 16.0752 83.5826 15.8259C83.9906 15.5765 84.3079 15.2252 84.5346 14.7719C84.7726 14.3185 84.8916 13.7915 84.8916 13.1909C84.8916 12.5902 84.7726 12.0689 84.5346 11.6269C84.3079 11.1735 83.9906 10.8222 83.5826 10.5729C83.1859 10.3122 82.7269 10.1819 82.2056 10.1819C81.6729 10.1819 81.2026 10.3122 80.7946 10.5729C80.3979 10.8222 80.0862 11.1735 79.8596 11.6269C79.6329 12.0689 79.5196 12.5902 79.5196 13.1909C79.5196 13.7915 79.6329 14.3185 79.8596 14.7719C80.0862 15.2252 80.3979 15.5765 80.7946 15.8259C81.2026 16.0752 81.6729 16.1999 82.2056 16.1999ZM91.8746 17.6789C91.0472 17.6789 90.3106 17.4919 89.6646 17.1179C89.0186 16.7325 88.5086 16.2055 88.1346 15.5369C87.7719 14.8682 87.5906 14.0919 87.5906 13.2079C87.5906 12.3125 87.7719 11.5305 88.1346 10.8619C88.5086 10.1819 89.0186 9.65485 89.6646 9.28085C90.3106 8.89552 91.0472 8.70285 91.8746 8.70285C92.9172 8.70285 93.7899 8.97485 94.4926 9.51885C95.1952 10.0629 95.6429 10.7995 95.8356 11.7289H94.0676C93.9542 11.2302 93.6936 10.8449 93.2856 10.5729C92.8889 10.3009 92.4129 10.1649 91.8576 10.1649C91.4042 10.1649 90.9849 10.2839 90.5996 10.5219C90.2142 10.7485 89.9026 11.0885 89.6646 11.5419C89.4379 11.9839 89.3246 12.5335 89.3246 13.1909C89.3246 13.6782 89.3926 14.1145 89.5286 14.4999C89.6646 14.8739 89.8459 15.1912 90.0726 15.4519C90.3106 15.7125 90.5826 15.9109 90.8886 16.0469C91.1946 16.1715 91.5176 16.2339 91.8576 16.2339C92.2316 16.2339 92.5659 16.1772 92.8606 16.0639C93.1666 15.9392 93.4216 15.7579 93.6256 15.5199C93.8409 15.2819 93.9882 14.9985 94.0676 14.6699H95.8356C95.6429 15.5765 95.1952 16.3075 94.4926 16.8629C93.7899 17.4069 92.9172 17.6789 91.8746 17.6789Z",
                fill: "#444444"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = Logo;
const Home = ()=>{
    _s();
    const [appMode, setAppMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('LANDING');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [components, setComponents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('3D');
    // Derived states
    const isSplit = appMode === 'SPLIT_VIEW';
    const handlePrompt = async (text)=>{
        setIsProcessing(true);
        // Add User Message
        const userMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        // Transition to Chat Preview if in Landing
        if (appMode === 'LANDING') {
            setAppMode('CHAT_PREVIEW');
        }
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processPrompt"])(text, components);
            setComponents(result.updatedComponents);
            // Add Assistant Message with Preview
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: result.change.description,
                timestamp: new Date(),
                previewData: {
                    changeId: result.change.id,
                    description: result.change.intent
                }
            };
            setMessages((prev)=>[
                    ...prev,
                    aiMsg
                ]);
        } catch (err) {
            console.error(err);
            const errorMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I encountered an error processing your request. Please try again.",
                timestamp: new Date()
            };
            setMessages((prev)=>[
                    ...prev,
                    errorMsg
                ]);
        } finally{
            setIsProcessing(false);
        }
    };
    const handlePreview = (changeId)=>{
        setAppMode('SPLIT_VIEW');
    // Optional: Select the component related to changeId
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-screen w-full bg-[#0B0D12] text-[#BBBBBB] overflow-hidden font-['DM_Sans']",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
                absolute inset-0 transition-all duration-[1500ms] ease-in-out
                ${appMode === 'LANDING' ? 'opacity-20 scale-125' : ''}
                ${appMode === 'CHAT_PREVIEW' ? 'opacity-10 scale-110 blur-sm' : ''}
                ${appMode === 'SPLIT_VIEW' ? 'left-[25%] w-[75%] opacity-100 scale-100' : 'w-full'}
            `,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PCBRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    components: components,
                    selectedId: null,
                    onSelect: ()=>{}
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 101,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
                z-40 transition-all duration-700 ease-in-out
                ${appMode === 'SPLIT_VIEW' ? 'fixed left-0 top-0 h-full w-[25%] bg-[#0B0D12] border-r border-[#ffffff1a] shadow-2xl' : 'absolute inset-0 pointer-events-none'}
            `,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full pointer-events-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatInterface, {
                        mode: appMode,
                        messages: messages,
                        onSendMessage: handlePrompt,
                        onPreview: handlePreview,
                        isLoading: isProcessing
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 113,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            !isSplit && appMode !== 'LANDING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-8 right-8 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setAppMode('SPLIT_VIEW'),
                    className: "bg-[#101422] border border-[#ffffff1a] p-3 rounded-full hover:bg-[#ffffff0a] text-[#777777] hover:text-white transition-all",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$563$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "rotate-[-90deg]",
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 130,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 126,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 125,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            appMode !== 'LANDING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-8 left-8 z-40 transition-all duration-500 ${isSplit ? 'opacity-0' : 'opacity-100'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#101422] border border-[#ffffff1a] rounded-[20px] px-4 py-3 flex items-center gap-3 shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scale-75",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 140,
                                columnNumber: 51
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 140,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[13px] font-bold text-[#777777] tracking-tight uppercase",
                            children: "current_file.edat"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 141,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 139,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 137,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            isSplit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-8 right-8 z-40 flex bg-[#101422] border border-[#ffffff1a] rounded-[16px] p-1 shadow-2xl",
                children: [
                    'Schematic',
                    'Layout',
                    '3D'
                ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setView(v),
                        className: `px-6 py-2 rounded-[12px] text-[12px] font-bold transition-all ${view === v ? 'bg-[#0038DF] text-white shadow-lg' : 'text-[#555555] hover:text-[#BBBBBB]'}`,
                        children: v
                    }, v, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 150,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 148,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 92,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Home, "OShiqojw6fJ4oEFDJrHHSHbzr20=");
_c1 = Home;
const __TURBOPACK__default__export__ = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "Logo");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_26de082a._.js.map