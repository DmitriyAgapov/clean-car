export const referenceAction = async ({ params, request }:any) => {
	let formData = await request.formData();
	console.log(request);
	console.log(params);
	console.log(formData);
	return console.log('act')
}
