(function start() {
	console.log('hello threejs!');
}());

var camera, scene, renderer;
var geometry, material, mesh;

//初始化
init();

//啟動enterframe animate
animate();

function init() {

	//建立renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//建立camera
	/*
	PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
	http://kcs.kcjh.ptc.edu.tw/~spt/computer/digital-image/foaus-len.htm
	fov — Camera frustum vertical field of view.
	aspect — Camera frustum aspect ratio.
	near — Camera frustum near plane.
	far — Camera frustum far plane.
	*/
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 100;
	//camera.position.z = 1;

	//建立mesh
	let size = 100;
	geometry = new THREE.SphereGeometry(size, size, size);//CubeGeometry
	material = new THREE.MeshLambertMaterial(
		{
			color: 0xF3FFE2,
			wireframe: false,//frame
			emissive: 0xff0000//glow
		}
	);//MeshBasicMaterial,MeshNormalMaterial
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, -1000);


	var loader = new THREE.BabylonLoader();
	loader.load('assets/test.babylon', function (babylonScene ) {
		scene = babylonScene;
		//scene.add( object );		
	});

	//建立scene並放上mesh
	scene = new THREE.Scene();
	//scene.add(mesh);

	//light
	var light = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(light);

	var light1 = new THREE.PointLight(0xffffff, 0.5);
	scene.add(light1);
}

function animate() {

	//觸發下次animate
	requestAnimationFrame(animate);

	//轉動mesh
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	//更新畫面
	renderer.render(scene, camera);

}