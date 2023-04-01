fetch('http://13.233.245.126:3000/userdetails')
  .then(response => response.text())
  .then(data => {
    const r =data.split(/\s+/)
    
    let TotalGpa =r[0]
    let TotalBacklogs=r[1]
    let Nocert=r[2] 
    let pos=r[3] 
    document.getElementById('cgpa2').innerText=TotalGpa;
    document.getElementById('totalbacklogs2').innerText=TotalBacklogs;
    document.getElementById('nocert2').innerText=Nocert;
    if(pos==0){
      document.getElementById('position2').innerText="No Postion";
      document.getElementById('recommec').innerText="1.Start exploring co-curricular activities that align with your interests and goals.\n2.Consider joining a club or organization that relates to your academic or career aspirations.\n3.Seek out volunteer opportunities in your community to gain valuable experience and make a positive impact.\n4.Attend events and workshops related to your field of study or personal interests to learn new skills and meet new people.";
    }
    else if(pos==1){
      document.getElementById('position2').innerText="Volunteer";
      document.getElementById('recommec').innerText="1.Consider taking on more leadership roles within your clubs or organizations, such as serving as a committee member or assistant to a chairperson.\n2.Look for opportunities to organize events or initiatives that align with your interests and goals.\n3.Seek out opportunities to collaborate with peers on projects or initiatives that align with your interests and goals.\n4.Attend conferences or workshops related to your field of study to gain new insights and stay up-to-date on industry trends.";
    }
    else if(pos==2){
      document.getElementById('position2').innerText="Board Member";
      document.getElementById('recommec').innerText="1.Look for opportunities to take on more challenging projects or leadership roles within your clubs or organizations, such as serving as a president.\n2.Consider pursuing advanced certifications or training related to your field of study or interests.\n3.Seek out opportunities to mentor or coach other students who are just starting out in their co-curricular activities.\n4.Network with peers and mentors in your field to gain insight and advice.";
    }
    else{
      document.getElementById('position2').innerText="Chair Person";
      document.getElementById('recommec').innerText="1.Congratulations on your achievements! Now is the time to reflect on the skills and experiences you gained from your co-curricular activities and how they relate to your academic or career aspirations.\n2.Consider pursuing more advanced or specialized certifications or training to further develop your skills and knowledge.\n3.Look for opportunities to mentor or coach other students who are just starting out in their co-curricular activities.\n4.Consider sharing your experiences through public speaking or writing to inspire others and build your personal brand.";
    }


    if (TotalGpa<6.0){
        document.getElementById('recommgpa').innerText="1.Start by identifying areas where you can improve your academic performance.\n2.This may involve seeking help from teachers, tutors, or academic advisors.\n3.Consider developing a study plan and schedule to help you stay on track with your coursework and assignments.\n4.Take advantage of academic support resources such as tutoring, writing centers, and study groups.\n5.Look for opportunities to participate in co-curricular activities that align with your interests and goals to help build your skills and experiences."
    }
    else if(6.0<=TotalGpa<8.0){
        document.getElementById('recommgpa').innerText="1.Continue to focus on improving your academic performance by setting goals and tracking your progress.\n2.Consider taking on more challenging coursework or projects to help build your skills and knowledge.\n3.Seek out opportunities for research or internships that can help you gain practical experience in your field.\n4.Attend career fairs or networking events to start building connections in your desired field."
    }
    else if(8.0<=TotalGpa<9.0){
        document.getElementById('recommgpa').innerText="1.Congratulations on your academic achievements so far! Continue to push yourself to achieve even greater academic success.\n2.Consider taking on leadership roles in your clubs or organizations to build your skills in areas such as teamwork and communication.\n3.Look for opportunities to present your research or other academic work at conferences or other events.\n4.Consider pursuing advanced coursework or certifications in your field to further develop your knowledge and skills."
    }
    else if(TotalGpa>9.0){
        console.log("HIII");
        document.getElementById('recommgpa').innerText="1.Well done on your outstanding academic achievements! Now is the time to start thinking about how you can translate your academic success into career opportunities.\n2.Consider seeking out research or internship opportunities that align with your career aspirations.\n3.Look for opportunities to present your research or other academic work at conferences or other events.\n4.Consider pursuing graduate or professional studies to further develop your knowledge and skills in your field."
    }

    if (0<=Nocert<=2){
        document.getElementById('recommcc').innerText="1.Start exploring co-curricular activities that align with your interests and goals.\n2.Consider joining a club or organization that relates to your academic or career aspirations.\n3.Seek out volunteer opportunities in your community to gain valuable experience and make a positive impact.\n4.Attend events and workshops related to your field of study or personal interests to learn new skills and meet new people."
    }
    else if(3<=Nocert<=5){
        document.getElementById('recommcc').innerText="1.Continue to explore a variety of co-curricular activities to gain a broad range of skills and experiences.\n2.Look for opportunities to take on leadership roles within your clubs or organizations.\n3.Consider pursuing advanced certifications or training related to your field of study or interests.\n4.Network with peers and mentors in your field to gain insight and advice."
    }
    else if(6<=Nocert<=8){
        document.getElementById('recommcc').innerText="1.Focus on quality over quantity by selecting co-curricular activities that align with your long-term goals.\n2.Look for opportunities to take on more challenging projects or leadership roles within your clubs or organizations.\n3.Seek out opportunities to collaborate with peers on projects or initiatives that align with your interests and goals.\n4.Attend conferences or workshops related to your field of study to gain new insights and stay up-to-date on industry trends."
    }
    else if(9<=Nocert<=10){
        document.getElementById('recommcc').innerText="1.Congratulations on your achievements! Now is the time to reflect on the skills and experiences you gained from your co-curricular activities and how they relate to your academic or career aspirations.\n2.Consider pursuing more advanced or specialized certifications or training to further develop your skills and knowledge.\n3.Look for opportunities to mentor or coach other students who are just starting out in their co-curricular activities.\n4.Consider sharing your experiences through public speaking or writing to inspire others and build your personal brand."
    }
  });