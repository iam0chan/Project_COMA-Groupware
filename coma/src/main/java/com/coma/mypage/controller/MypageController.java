package com.coma.mypage.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.coma.emp.service.EmpService;
import com.coma.emp.service.EmpServiceImpl;
import com.coma.model.dto.Emp;
import com.coma.mypage.model.service.MypageService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequestMapping("/mypage")
@Controller
@RequiredArgsConstructor
public class MypageController {
	@Autowired
	private final MypageService service;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final EmpServiceImpl  empService;
	//나의 상세보기로 화면 전환하는 메소드
	@GetMapping("/mypageDetails")
	public void test() { }
	
	//상세보기 수정 메소드
	@PostMapping("/updatemypage")
	public String  updateEmployee(@RequestParam Map<String, Object> emp,
			@RequestParam("empPhoto") MultipartFile file, HttpSession session
								)throws IOException {	  				
	// 프로필 사진 업로드하기 
		//파일 경로 
		String profilepath = session.getServletContext().getRealPath("/resource/upload/profile/");
		//폴더가 없으면 만들어주는 메소드 
		createFolder(profilepath);
		// 첨부파일데이터가 비어있지 않으면 업로드하기 
		if (!file.isEmpty()) {
		    String path = profilepath + file.getOriginalFilename();
		    file.transferTo(new File(path));
		}			

//		System.out.println("EMP" +emp);
		//비밀번호 값 받아서 암호화하기 
		String newPassword = (String) emp.get("empPw");
//		System.out.println( "뉴 비밀번호 "+newPassword);
	    String newEncryptedPassword = passwordEncoder.encode(newPassword);
//	    System.out.println( "암호화된 비밀번호  "+newEncryptedPassword);
	    emp.put("empPhoto", file.getOriginalFilename());
	    emp.put("newEmpPw", newEncryptedPassword);
		int result = service.updateEmp(emp);
//		System.out.println(result);
		return "redirect:/";
	}
			
//업로드 폴더가 없다면 만들어주는 메소드 
	private void createFolder(String folderPath) {
	    // Convert the folder path to a Path object
	    Path path = Paths.get(folderPath);
	    if (Files.notExists(path)) {
	        try {
	            Files.createDirectories(path);
	            System.out.println("업로드 폴더 만들었다 !!  ");
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	}

	//인사팀에서 상세보기들어가기 페이지  
	@GetMapping("/EmployeeDetails")
	public void employeeDetails(@RequestParam("empId") String empId, Model model) {
	    //System.out.println("Received empId: " + empId);	    
	    Emp e = empService.selectEmpById(empId);	    
	    //System.out.println( "결과"+e);	    
	    // 모델에 직원 정보를 추가하여 뷰에 전달
	    model.addAttribute("emp", e);	    
	}
	
	@PostMapping("/EmployeeDetailEnd")
	public String  updateEmployeeDetail(@RequestParam Map<String, Object> emp) {
		System.out.println("Received!!!"+emp);
		int result = service.updateEmployeeDetail(emp);
		System.out.println(result);
		return "redirect:/admin/adminEmp";
	}
	

	
	
}
