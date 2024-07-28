
import * as THREE from './node_modules/three/build/three.module.js';

export class SceneManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.balls = [];
        this.tubes = [];
        this.bricks = [];
        this.planes = [];
    }

    init() {
        this.initScene();
        this.initLights();
        this.initCamera();
        this.initRenderer();
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLights() {
        /*const pointLight1 = new THREE.PointLight(0x00ffff, 1); // Rouge
        pointLight1.position.set(100, 100, 50);
        pointLight1.distance = 500; // Distance d'atténuation
        pointLight1.decay = 0.0001; // Vitesse d'atténuation
        this.scene.add(pointLight1);*/

        const ambientLight = new THREE.AmbientLight(0x404040); // lumière douce blanche
        this.scene.add(ambientLight);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(100, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 500;
        this.camera.lookAt(0, 0, 0);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    addPlane(position, dimensions) {
        const geometry = new THREE.PlaneGeometry(dimensions.width, dimensions.height);
        const material = new THREE.MeshStandardMaterial({ color: 0x404040, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(position.x, position.y, position.z || 0);
        this.scene.add(plane);
        this.planes.push(plane);
    }

    addBall(position) {
        
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const ball = new THREE.Mesh(geometry, material);
        ball.position.set(position.x, position.y, position.z || 0);
        ball.castShadow = true; // Permet à la balle de projeter des ombres
        
        //Light
        const pointLight = new THREE.PointLight(0x00ffff, 1); // Rouge
        pointLight.position.set(position.x, position.y, 15);
        pointLight.distance = 200; // Distance d'atténuation
        pointLight.decay = 0.0001; // Vitesse d'atténuation
        ball.add(pointLight); 
        

        this.scene.add(ball);
        this.balls.push(ball);
    }

    addTube(position, dimensions, orientation) {
        const radius = dimensions.diameter / 2;
        const height = dimensions.length;

        // Create the main cylinder
        const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;

        // Create the top hemisphere
        const hemisphereGeometry = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const hemisphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const topHemisphere = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);
        topHemisphere.castShadow = true;
        topHemisphere.receiveShadow = true;

        // Create the bottom hemisphere
        const bottomHemisphere = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);
        bottomHemisphere.castShadow = true;
        bottomHemisphere.receiveShadow = true;
        bottomHemisphere.rotation.x = Math.PI;

        // Create a group and add all parts
        const tube = new THREE.Group();
        tube.add(cylinder);
        tube.add(topHemisphere);
        tube.add(bottomHemisphere);

        if (orientation === 'horizontal')
            tube.rotation.z = Math.PI / 2;
        topHemisphere.position.set(0, height / 2, 0);
        bottomHemisphere.position.set(0, -height / 2, 0);

        tube.position.set(position.x, position.y, position.z || 0);

        //Light
        const pointLight = new THREE.PointLight(0xff0000, 1); // Rouge
        pointLight.position.set(0, 0, 15);
        pointLight.distance = 200; // Distance d'atténuation
        pointLight.decay = 0.0001; // Vitesse d'atténuation
        tube.add(pointLight); 

        this.scene.add(tube);
        this.tubes.push(tube);
    }

    addBrick(position, dimensions) {
        const geometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, 1); // z-depth is set to 1
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const brick = new THREE.Mesh(geometry, material);
        brick.position.set(position.x, position.y, position.z || 0);
        brick.castShadow = true;
        brick.receiveShadow = true;

        //Light
        const pointLight = new THREE.PointLight(0xff0000, 1); // Rouge
        pointLight.position.set(position.x, position.y, 15);
        pointLight.distance = 200; // Distance d'atténuation
        pointLight.decay = 0.0001; // Vitesse d'atténuation
        brick.add(pointLight); 

        this.scene.add(brick);
        this.bricks.push(brick);
    }

    getPlanes() {
        return this.planes;
    }

    getBalls() {
        return this.balls;
    }

    getTubes() {
        return this.tubes;
    }

    getBricks() {
        return this.bricks;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}