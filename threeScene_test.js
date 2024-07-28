import * as THREE from '../node_modules/three/build/three.module.js';

export function initThreeScene(canvasId, ballPosition) {
    const canvas = document.getElementById(canvasId);
    
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(canvas.width, canvas.height);

    // Create a ball
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Utilisez MeshStandardMaterial pour mieux réagir à la lumière
    const ball = new THREE.Mesh(geometry, material);

    // Set the ball's position
    ball.position.set(ballPosition.x, ballPosition.y, 0);
    scene.add(ball);

    // Add a directional light
    const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Add a directional light
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-10, 10, 0).normalize();
    scene.add(directionalLight2);



    // Position the camera
    camera.position.z = 50;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Optional: Add some rotation to the ball for a dynamic effect
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;

        ball.position.x += 0.2

        renderer.render(scene, camera);
    }

    animate();
}
