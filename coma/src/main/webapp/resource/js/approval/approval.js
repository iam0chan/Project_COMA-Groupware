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

/* 결재자 검색을 위한 datalist */

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
				$('option').remove();			
				JSON.parse(data).forEach(e=>{
					/* datalist 옵션태그 만들기 */
				
					const search_op = $('<option>');
					search_op.val(e.empName+" "+e.dept.deptType+" "+e.job.jobType);
					
					$("#search_list1").append(search_op);
				});
			});
		
	},800);
			}
})());


/* 결재자 추가, 삭제  */

const app_name_arr = [];
const app_dept_arr = [];
const app_job_arr = [];
const app_all_arr = [];

const addDelAppr=(function(){
	let appr_num=1;
	
	const addAppr=()=>{

				const emp = $('#search_app').val(); /*name + dept + job */
	
				const emp_arr = emp.split(" ");
				
				console.log("empArr : "+ emp_arr);
				
				const emp_name = emp_arr[0];
				const emp_dept = emp_arr[1];
				const emp_job = emp_arr[2];
			
			/*적힌 값과 선택한 값 일치하는지 비교*/
				if($('#search_app').val()==emp_name+" "+emp_dept+" "+emp_job){
					
					/* 중복 결재자 있는지 확인 */
					if(!app_all_arr.includes($('#search_app').val())){
					
						/* 추가한 결재자 3명 이하인지 확인 */
						if(appr_num<=3){
							const btn_tag = $('<button type="button" class="btn btn-secondary" id="app_fix'+appr_num +'"'
												+ 'data-container="body" data-toggle="popover" data-color="secondary" data-placement="top">');
							const i_tag = $('<i class="ni ni-fat-remove" style="cursor:pointer" onclick="delAppr(this);">');
							
					
							app_all_arr.push(emp);
							app_name_arr.push(emp_name);
							app_dept_arr.push(emp_dept);
							app_job_arr.push(emp_job);
							
							
							btn_tag.text(emp_name);
							btn_tag.attr('data-content',emp_dept+" "+emp_job);
							console.log("dept: " + emp_dept);
							console.log("job: " + emp_job);
							
							$('.appr_container').append(btn_tag);
							$('.appr_container').append(i_tag);
						
							btn_tag.popover();
							 /* 부트스트랩은 js를 사용하여 동적으로 웹 페이지를 조작하고 업데이트하기때문에 
				            동적으로 생성된 요소에 대해서는 초기화 작업이 필요.*/
							appr_num++;
						}else{
							
							alert("결재자는 3명까지 추가 가능합니다.");
						}
					
					}else{
						alert("이미 추가된 결재자입니다.");
					}
				
				
				}else{
					alert("없는 사원입니다.");
				}
				
			
			
		
	}; 
	
	const delAppr=(element)=>{ /* element : 삭제 icon */
		if(appr_num!=1){
			
			const btn = $(element).prev(); 
			
			if(btn.data('bs.popover')){ 
				/* data()메소드를 사용하여 요소에 연결된 데이터를 가져옴.
					-> 해당 요소에 popver가 초기화되었는지 확인.
				   bs.popver 데이터가 존재하면 초기화된 것.
					-> popver('dispose')호출해 popver 제거. */
				btn.popover('dispose');
			}
				

					
				const del_name = btn.text();
				
				const del_type = btn.attr('data-content');
				
				for(let i=0; i<app_all_arr.length; i++){
					if(app_all_arr[i]===del_name+" "+del_type){
						app_all_arr.splice(i, 1);
						i--;
					}
				}
			
			/* 서버로 값 보낼때는 app_all_arr 파싱해서 보내기 */
		
			btn.remove();
			$(element).remove();
		
		
			
			appr_num--;
		}
		
	}
	return [addAppr, delAppr];
	
})();

const addAppr=addDelAppr[0];
const delAppr=addDelAppr[1];

	

/* 참조자 검색을 위한 datalist */

document.querySelector("#search_ref").addEventListener("keyup",(()=>{
			
	let requestFunc; //closure
	return e=>{
		
		if(requestFunc){
			clearTimeout(requestFunc);
			
		}
		requestFunc = setTimeout(()=>{
			fetch("/approval/approver?data="+e.target.value)
			.then(result=>result.text())
			.then(data=>{
				$('option').remove();	
				
				JSON.parse(data).forEach(e=>{
		
				/*	console.log(e.dept.deptType + e.job.jobType);*/
					const search_op = $('<option>');
					search_op.val(e.empName+" "+e.dept.deptType+" "+ e.job.jobType);
					 $('#search_list2').append(search_op);
						

				});
			});
		
	},800);
			}
})());



/* 참조자 추가, 삭제  */

const ref_name_arr = [];
const ref_dept_arr = [];
const ref_job_arr = [];
const ref_all_arr = [];

const addDelref=(function(){
	let ref_num=1;
	
	const addref=()=>{

				const emp = $('#search_ref').val(); /*name + dept + job */
	
				const emp_arr = emp.split(" ");
				
				const emp_name = emp_arr[0];
				const emp_dept = emp_arr[1];
				const emp_job = emp_arr[2];
			
			/*적힌 값과 선택한 값 일치하는지 비교*/
				if($('#search_ref').val()==emp_name+" "+emp_dept+" "+emp_job){
					
					/* 중복 참조자 있는지 확인 */
					if(!ref_all_arr.includes($('#search_ref').val())){
					
						/* 추가한 참조자 3명 이하인지 확인 */
						if(ref_num<=3){
							const ref_btn_tag = $('<button type="button" class="btn btn-secondary" id="ref_fix'+ref_num +'"'
												+ 'data-container="body" data-toggle="popover" data-color="secondary" data-placement="top">');
							const ref_i_tag = $('<i class="ni ni-fat-remove" style="cursor:pointer" onclick="delref(this);">');
							
					
							ref_all_arr.push(emp);
							ref_name_arr.push(emp_name);
							ref_dept_arr.push(emp_dept);
							ref_job_arr.push(emp_job);
							
							
							ref_btn_tag.text(emp_name);
							ref_btn_tag.attr('data-content',emp_dept+" "+emp_job);
							console.log("dept: " + emp_dept);
							console.log("job: " + emp_job);
							
							$('.ref_container').append(ref_btn_tag);
							$('.ref_container').append(ref_i_tag);
						
							ref_btn_tag.popover();
							ref_num++;
						}else{
							
							alert("참조자는 3명까지 추가 가능합니다.");
						}
					
					}else{
						alert("이미 추가된 결재자입니다.");
					}
				
				
				}else{
					alert("없는 사원입니다.");
				}
				
			
			
		
	}; 
	
	const delref=(element)=>{ /* element : 삭제 icon */
		if(ref_num!=1){
			
			const btn = $(element).prev(); 
			
			if(btn.data('bs.popover')){ 
				btn.popover('dispose');
			}
				

					
				const del_ref_name = btn.text();
				
				const del_ref_type = btn.attr('data-content');
				
				console.log("before : "+ ref_all_arr);
				for(let i=0; i<ref_all_arr.length; i++){
					if(ref_all_arr[i]===del_ref_name+" "+del_ref_type){
						ref_all_arr.splice(i, 1);
						i--;
					}
				}
					console.log("after : "+ ref_all_arr);
			
			/* 서버로 값 보낼때는 ref_all_arr 파싱해서 보내기 */
		
			btn.remove();
			$(element).remove();
		
		
			
			ref_num--;
		}
		
	}
	return [addref, delref];
	
})();

const addref=addDelref[0];
const delref=addDelref[1];


	