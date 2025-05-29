
import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      line: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
      pointLight: ReactThreeFiber.LightNode<THREE.PointLight, typeof THREE.PointLight>;
      ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      lineBasicMaterial: ReactThreeFiber.MaterialNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
      meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
      sphereGeometry: ReactThreeFiber.BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
      bufferGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
      ringGeometry: ReactThreeFiber.BufferGeometryNode<THREE.RingGeometry, typeof THREE.RingGeometry>;
    }
  }
}
