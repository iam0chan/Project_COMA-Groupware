const docType = function(value){
	
	console.log(value);
	
	document.getElementById("leave").style.display= "none";
	document.getElementById("cash").style.display= "none";
	document.getElementById("req").style.display= "none";
	document.getElementById("etc").style.display= "none";

	document.getElementById(value).style.display="block";
}
  
  	
const leave_type = function(value){
	
	document.getElementById("half_leave").style.display="none";
	
	document.getElementById(value).style.display="block";
}
  	
const editor = new toastui.Editor({
    el: document.querySelector('#content'), // 에디터를 적용할 요소 (컨테이너)
    height: '500px',                        // 에디터 영역의 높이 값 (OOOpx || auto)
    initialEditType: 'wysiwyg',     // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
    previewStyle: 'vertical'                // 마크다운 프리뷰 스타일 (tab || vertical)
});


const addDelFunction=(function(){
	let count=2;
	const addFile=()=>{
		if(count<=3){
			const fileForm = $("#basicFileForm").clone(true);
			fileForm.find(".custom-file-label").text("");
			fileForm.find(".file_span").text("첨부파일 " + count);
			$(".btn_container").before(fileForm);
			count++; 
		}else{
			alert("첨부파일은 3개까지 추가 가능합니다.");
		}
		
	};
	const delFile=()=>{
		if(count!=2){
			$(".btn_container").prev().remove();
			count--;
		}
		
	};
	
	return [addFile, delFile];
	
})();
    
const fn_addFileForm=addDelFunction[0];
const fn_deleteFileForm=addDelFunction[1];


$(document).on("change",".custom-file-input",(e=>{
	
	const fileName = e.target.files[0].name;
	console.log(fileName)
	$(e.target).next(".custom-file-label").text(fileName);
	
}));


//$("#search_app").keyup(function(){
//	console.log("test");
//	const path = $("#pathValue").val();
//	console.log(path);
//	const appAjax=()=>{
//		
//		fetch(path+"/approval/approver")
//		.then(response=>{
//			console.log("ttt")
//			console.log(response); 
//			return response.json()
//		})
//		.then(data=>{
//				console.log("ttt2")
//			console.log(data);
//		})
//	}
//	
//});

document.querySelector("#search_app").addEventListener("keyup",(()=>{
	let requestFunc; //closure
	return e=>{
		
		if(requestFunc){
			clearTimeout(requestFunc);
			
		}
		requestFunc = setTimeout(()=>{
			fetch("/approval/approver?data="+e.target.value)
			.then(result=>result.text())
			.then(data=>{
				console.log(data);
			});
		
	},800);
			}
})());




