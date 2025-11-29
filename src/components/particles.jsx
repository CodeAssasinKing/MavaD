// MavaColoredParticles.jsx
import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import  CenterTypingSlogan from "./slogans.jsx";

function getLetterBounds(font, letter, size) {
    const shapes = font.generateShapes(letter, size);
    const g = new THREE.ShapeGeometry(shapes);
    g.computeBoundingBox();
    const bb = g.boundingBox;
    const w = bb ? bb.max.x - bb.min.x : 0;
    const h = bb ? bb.max.y - bb.min.y : 0;
    return { w, h };
}

function buildLayout(font, letters, size, padding = 1.2) {
    const bounds = letters.map((ch) => getLetterBounds(font, ch, size));
    const widths = bounds.map((b) => b.w);
    const totalW = widths.reduce((a, b) => a + b, 0) + padding * (letters.length - 1);

    let x = -totalW / 2;
    const offsets = [];
    for (let i = 0; i < letters.length; i++) {
        offsets.push(x + widths[i] / 2);
        x += widths[i] + padding;
    }

    return { offsets, totalW };
}

function LetterParticles({
                             font,
                             letter,
                             offsetX = 0,
                             color = "#fff",
                             count = 10000,
                             size = 5,
                             repelRadius = 1.9,
                             repelStrength = 1.4,
                             spring = 0.05,
                             damping = 0.88,
                             dotSize = 0.1,
                         }) {
    const pointsRef = useRef(null);
    const mousePoint = useMemo(() => new THREE.Vector3(), []);
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

    const { geo, target, vel } = useMemo(() => {
        const shapes = font.generateShapes(letter, size);
        const shapeGeo = new THREE.ShapeGeometry(shapes);
        shapeGeo.computeBoundingBox();

        const bb = shapeGeo.boundingBox;
        const cx = (bb.max.x + bb.min.x) / 2;
        const cy = (bb.max.y + bb.min.y) / 2;
        shapeGeo.translate(-cx + offsetX, -cy, 0);

        const mesh = new THREE.Mesh(shapeGeo, new THREE.MeshBasicMaterial());
        const sampler = new MeshSurfaceSampler(mesh).build();

        const targetPositions = new Float32Array(count * 3);
        const startPositions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        const tmp = new THREE.Vector3();
        for (let i = 0; i < count; i++) {
            sampler.sample(tmp);

            targetPositions[i * 3 + 0] = tmp.x;
            targetPositions[i * 3 + 1] = tmp.y;
            targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

            startPositions[i * 3 + 0] = tmp.x + (Math.random() - 0.5) * 0.4;
            startPositions[i * 3 + 1] = tmp.y + (Math.random() - 0.5) * 0.4;
            startPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
        }

        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute("position", new THREE.BufferAttribute(startPositions, 3));

        return { geo: pointsGeo, target: targetPositions, vel: velocities };
    }, [font, letter, offsetX, size, count]);

    useFrame((state) => {
        state.raycaster.setFromCamera(state.mouse, state.camera);
        state.raycaster.ray.intersectPlane(plane, mousePoint);

        const posAttr = geo.getAttribute("position");
        const pos = posAttr.array;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;

            let x = pos[ix + 0];
            let y = pos[ix + 1];
            let z = pos[ix + 2];

            const tx = target[ix + 0];
            const ty = target[ix + 1];
            const tz = target[ix + 2];

            let ax = (tx - x) * spring;
            let ay = (ty - y) * spring;
            let az = (tz - z) * spring;

            const dx = x - mousePoint.x;
            const dy = y - mousePoint.y;
            const dist = Math.hypot(dx, dy);

            if (dist < repelRadius) {
                const f = (1 - dist / repelRadius) * repelStrength;
                const nx = dx / (dist + 1e-6);
                const ny = dy / (dist + 1e-6);
                ax += nx * f;
                ay += ny * f;
                az += f * 0.25;
            }

            vel[ix + 0] = (vel[ix + 0] + ax) * damping;
            vel[ix + 1] = (vel[ix + 1] + ay) * damping;
            vel[ix + 2] = (vel[ix + 2] + az) * damping;

            pos[ix + 0] = x + vel[ix + 0];
            pos[ix + 1] = y + vel[ix + 1];
            pos[ix + 2] = z + vel[ix + 2];
        }

        posAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} geometry={geo}>
            <pointsMaterial
                color={color}
                size={dotSize}
                sizeAttenuation
                transparent
                opacity={0.98}
                depthWrite={false}
            />
        </points>
    );
}

function ResponsiveWord({ font }) {
    const { viewport } = useThree();
    const groupRef = useRef(null);

    const letters = ["M", "A", "V", "A"];
    const colors = ["#AD1C42", "#ffffff", "#AD1C42", "#ffffff"];

    const baseSize = 5;
    const padding = 0.5;

    const layout = useMemo(() => buildLayout(font, letters, baseSize, padding), [font]);
    const compressX = 0.9;

    // scale word to fit screen width
    const scale = useMemo(() => {
        const targetW = viewport.width * 0.70;          // use 85% of screen width
        const s = targetW / (layout.totalW * compressX);
        return THREE.MathUtils.clamp(s, 0.45, 1.15);     // clamp for tiny/huge screens
    }, [viewport.width, layout.totalW]);

    useEffect(() => {
        if (!groupRef.current) return;
        groupRef.current.scale.set(scale * compressX, scale, 1);

    }, [scale, compressX]);

    // make effect sizes responsive too (so it feels одинаково)
    const dotSize = 0.1 * scale;
    const repelRadius = 1.9 * scale;

    const common = {
        size: baseSize,
        repelRadius,
        repelStrength: 1.4,
        spring: 0.05,
        damping: 0.88,
        dotSize,
        count: 9000,
    };

    return (
        <group ref={groupRef}>
            {letters.map((ch, i) => (
                <LetterParticles
                    key={i}
                    font={font}
                    letter={ch}
                    offsetX={layout.offsets[i]}
                    color={colors[i]}
                    {...common}
                />
            ))}
        </group>
    );
}

export default function MavaColoredParticles() {
    const font = useLoader(FontLoader, "/fonts/helvetiker_bold.typeface.json");

    return (
        <div style={{ width: "100vw", height: "90svh", background: "black" }} className="relative">
            <Canvas camera={{ position: [0, 0, 28], fov: 45 }} dpr={[1, 2]} style={{zIndex:9}}>
                <ambientLight intensity={1} />
                <ResponsiveWord font={font}/>
            </Canvas>
            <CenterTypingSlogan />
            <div className="absolute inset-0">
                <img src="/technological-futuristic-holograms-logistics-means-transport.jpg" alt="" className="h-full w-full object-cover grayscale opacity-15" draggable={false} />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/70 to-black" />
            </div>
        </div>
    );
}
