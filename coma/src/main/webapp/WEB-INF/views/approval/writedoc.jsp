<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param name="id" value="mine" />
</jsp:include>
<!-- 
<link href="/resource/css/approval/writedoc.css" rel="stylesheet" />
<script src="/resource/js/approval/approval.js"></script> -->
<!-- 에디터 -->
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
  <!-- Editor's Style -->
  <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />

<link href="/resource/css/approval/writedoc.css" rel="stylesheet" />


    <!-- TEAM COMA SPACE -->
	<form>
    <div class="coma-container" style="margin-top:5px; margin-bottom: 5px;">
        <div class="container" style="text-align: center; margin-top:5px; margin-bottom: 5px;">
          <!-- coma content space -->
          
          <div class="doc_basic">
	  
	          
	          <div class="row">
	       			<div class="col-3">
	       				문서 종류
	       			</div>
		            <div class="col-7">
		            	 <select class="form-control form-control-sm" onchange="docType(this.value);">
						  <option value="" selected disabled hidden>문서 종류를 선택하세요.</option>
						  <option value="leave">휴가신청서</option>
						  <option value="cash">지출결의서</option>
						  <option value="req">품의서</option>
						  <option value="etc">기타</option>
						</select> 
					
		            </div>
		            <div class="col-2">
		            </div>

		      </div>    

	          <div class="row">
	            <div class="col-3">
	            	문서 제목
	            </div>
	            <div class="col-7">
	            	<input class="form-control" type="text" placeholder="제목">
	            </div>  
	            <div class="col-2">
	            </div>
	          </div>
          </div>
          
          <div class="app_line">
          
	          <div class="row">
	     		<div class="col-3">
	     			결재자
	     		</div>
	            <div class="col-7">
			            <div class="input-group mb-3">	  
							  <input type="search" class="form-control" placeholder="이름을 입력하세요." aria-label="Example text with button addon" aria-describedby="button-addon1">
							  <div class="input-group-prepend">
							    <button class="btn btn-outline-primary" type="button" id="button-addon1">검색하기</button>
							  </div>
						</div>

	           	</div>
	           	<div class="col-2">
	            </div>
	          </div> 	
	          
	          <div class="row ck_appr">
	          	<div class="col-3">
	          	</div>
	          	<div class="col-7">
	          		<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-color="secondary" data-placement="top" data-content="인사팀장">
					  이보연
					</button>
					<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-color="secondary" data-placement="top" data-content="교육팀장">
					  정우현
					</button>
	          	</div>
	          	<div class="col-2">
	          	</div>
	          	
	          </div>
	          <div class="row">
	 			<div class="col-3">
	 				참조자
	     		</div>
		        <div class="col-7">
		           		<div class="input-group mb-3">	  
							  <input type="search" class="form-control" placeholder="이름을 입력하세요." aria-label="Example text with button addon" aria-describedby="button-addon1">
							  <div class="input-group-prepend">
							    <button class="btn btn-outline-primary" type="button" id="button-addon1">검색하기</button>
							  </div>
						</div>
	            </div>
    			<div class="col-2">
	            </div>
          	</div>
          	 <div class="row ck_appr">
	          	<div class="col-3">
	          	</div>
	          	<div class="col-7">
	          		<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-color="secondary" data-placement="top" data-content="인사팀장">
					  이규홍
					</button>

	          	</div>
	          	<div class="col-2">
	          	</div>
         </div> 
           
 	
<!-- 문서별 입력 내용 -->

          <div id="leave" style="display:none;">
       		<hr>
       		
       		<h2>휴가 신청서</h2>
	          <div class="row">
	          		<div class="col-3">
	          			휴가 종류
	          		</div>
		          	<div class="col-7">
		          		<select class="form-control form-control-sm" onchange="leave_type(this.value)">
		          		  <option value="" selected disabled hidden>휴가 종류를 선택하세요.</option>
						  <option>연차</option>
						  <option>반차(오전)</option>
						  <option>반차(오후)</option>
						</select>
				
		          	</div>
		          	<div class="col-2">
		          	</div>
		  
	          </div>  
		       <div class="row">
				<!-- 휴가 신청 날짜 선택 -->
					<div class="col-3">
	          			휴가 날짜
	          		</div>
					<div class="col-6">
						<div class="input-daterange datepicker row align-items-center date_bo">
							    <div class="col">
							        <div class="form-group">
							            <div class="input-group">
							                <div class="input-group-prepend">
							                    <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
							                </div>
							                <input class="form-control" placeholder="시작 날짜" type="text" >
							            </div>
							        </div>
							    </div>
							   
							    <div class="col">
							        <div class="form-group">
							            <div class="input-group">
							                <div class="input-group-prepend">
							                    <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
							                </div>
							                <input class="form-control" placeholder="끝 날짜" type="text" >
							            </div>
							        </div>
							    </div>
							</div>
		     		  </div>
		     		  <div class="col-3"></div>
			     </div>  

	      </div>
	        
          <div id="cash" style="display:none;">  
          <hr>    
          	<h2>지출결의서</h2>
	          <div class="row">
		          	<div class="col-3">
		          		비용
		          	</div>
		          	<div class="col-7">
		          		<div class="form-group">
						    <div class="input-group">
						      <div class="input-group-prepend">
						        <span class="input-group-text">￦</span>
						      </div>
						      <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
						      <div class="input-group-append">
						        <span class="input-group-text">.00</span>
						      </div>
						    </div>
						</div>
		          	</div>
		          	<div class="col-2"></div>
	          </div> 
	          <div class="row">
	          	<div class="col-3">
	          		지출 날짜
	          	</div>
	          	<div class="col-7">
          		   <div class="form-group date_bo">
					   <div class="input-group">
					        <div class="input-group-prepend">
					            <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
					        </div>
					        <input class="form-control datepicker" placeholder="날짜를 선택하세요." type="text" >
					    </div>
					</div>
	          	</div>
	          	<div class="col-2"></div>
	          </div>
           </div>
          <div id="req" style="display:none;">
          <hr>
          	<h2>품의서</h2>
	          <div class="row">
	          	<div class="col-3">
	          		기안 날짜
	          	</div>
	          	<div class="col-7">
          		    <div class="form-group date_bo">
					   <div class="input-group">
					        <div class="input-group-prepend">
					            <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
					        </div>
					        <input class="form-control datepicker" placeholder="날짜를 선택하세요." type="text">
					    </div>
					</div>
	          	</div>
	          	<div class="col-2"></div>
	          </div>
          </div>
          
          <div id="etc" style="display:none;">
          <hr>
          		<h2>기타 문서</h2>
           <div class="row">
          	<div class="col-3">
          		기안 날짜
          	</div>
          	<div class="col-7">
         		    <div class="form-group date_bo">
				   <div class="input-group">
				        <div class="input-group-prepend">
				            <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
				        </div>
				        <input class="form-control datepicker" placeholder="날짜를 선택하세요." type="text">
				    </div>
				</div>
          	</div>
          	<div class="col-2"></div>
          </div>
	    
	     </div>
          
              
    <!-- 토스트 에디터 -->
    <div class="row">
      <div class="col-12">
       	  <div id="content"></div>
      </div>
    </div>      
    
   	<div class="row">
		<div class="col-12">
			    <div class="custom-file">
			        <input type="file" class="custom-file-input" id="customFileLang" lang="en">
			        <label class="custom-file-label" for="customFileLang">첨부 파일</label>
			    </div>
		</div>
		
	</div>    
          
    <div class="row btn_container">
    	<div class="col-11"></div>
    	<div class="col-1">
    			<button type="button" class="btn btn-primary btn-lg">작성 완료</button>
    	</div>
    </div>      
          <!-- coma content space -->
        </div>
    </div>

   </form>   
    
    <!-- TEAM COMA SPACE -->
    </div>
  </div>
  

  

<script src="/resource/js/approval/approval.js"></script> 

<jsp:include page="/WEB-INF/views/common/footer.jsp"/>


	          