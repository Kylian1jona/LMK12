(function(){
  const WORKSPACE_KEY="learnmaster_tutor_workspace_v1";
  let tutorWorkspaceUser=null;
  let tutorWorkspaceState={schedule:[],lessons:[],assignments:[],learners:[]};

  function safe(value){
    return String(value??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }
  function readState(){
    try{
      const parsed=JSON.parse(window.learnMasterStore?.getItem(WORKSPACE_KEY)||"{}");
      tutorWorkspaceState={
        schedule:Array.isArray(parsed.schedule)?parsed.schedule:[],
        lessons:Array.isArray(parsed.lessons)?parsed.lessons:[],
        assignments:Array.isArray(parsed.assignments)?parsed.assignments:[],
        learners:Array.isArray(parsed.learners)?parsed.learners:[]
      };
    }catch(error){ tutorWorkspaceState={schedule:[],lessons:[],assignments:[],learners:[]}; }
  }
  function writeState(){ window.learnMasterStore?.setItem(WORKSPACE_KEY,JSON.stringify(tutorWorkspaceState)); }

  class K12TutorPortal extends HTMLElement{
    connectedCallback(){
      if(this.dataset.rendered==="true") return;
      this.dataset.rendered="true";
      this.innerHTML=String.raw`
        <div id="tutorWorkspace" class="tutor-workspace" hidden>
          <aside class="tutor-rail">
            <div class="tutor-brand"><span>ARC</span><div><b>Tutor Studio</b><small>Professional workspace</small></div></div>
            <nav aria-label="Tutor workspace">
              <button type="button" class="is-active" data-tutor-view="overview" onclick="showTutorWorkspaceView('overview',this)">Overview</button>
              <button type="button" data-tutor-view="schedule" onclick="showTutorWorkspaceView('schedule',this)">Schedule</button>
              <button type="button" data-tutor-view="lessons" onclick="showTutorWorkspaceView('lessons',this)">Lesson plans</button>
              <button type="button" data-tutor-view="assignments" onclick="showTutorWorkspaceView('assignments',this)">Assignments</button>
              <button type="button" data-tutor-view="learners" onclick="showTutorWorkspaceView('learners',this)">Learners</button>
              <button type="button" data-tutor-view="messages" onclick="showTutorWorkspaceView('messages',this)">Messages</button>
            </nav>
            <button type="button" class="tutor-signout" onclick="logout()">Sign out</button>
          </aside>
          <main class="tutor-main">
            <header class="tutor-topline"><div><span>PRIVATE TUTOR OPERATIONS</span><h1 id="tutorWorkspaceGreeting">Good day</h1></div><div class="tutor-status"><i></i> Community profile active</div></header>

            <section class="tutor-view is-active" data-tutor-panel="overview">
              <div class="tutor-stat-grid"><article><span>Upcoming blocks</span><b id="tutorScheduleCount">0</b></article><article><span>Lesson plans</span><b id="tutorLessonCount">0</b></article><article><span>Learners</span><b id="tutorLearnerCount">0</b></article><article><span>Unread messages</span><b id="tutorMessageCount">0</b></article></div>
              <div class="tutor-overview-grid"><article><span>NEXT SESSION</span><h2 id="tutorNextSession">No session scheduled</h2><p>Use Schedule to publish times when families can reach you.</p></article><article><span>WORKSPACE BOUNDARY</span><h2>Tutor-only access</h2><p>This account cannot open student lessons, rewards, subscriptions, or family profiles.</p></article></div>
            </section>

            <section class="tutor-view" data-tutor-panel="schedule">
              <div class="tutor-section-head"><span>AVAILABILITY</span><h2>Control your schedule</h2><p>Create time blocks that can be shown to families.</p></div>
              <form class="tutor-editor" onsubmit="saveTutorSchedule(event)"><label>Day<select id="tutorScheduleDay" required><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option></select></label><label>Start<input id="tutorScheduleStart" type="time" required></label><label>End<input id="tutorScheduleEnd" type="time" required></label><label>Format<select id="tutorScheduleFormat"><option value="online">Online</option><option value="local">In person</option></select></label><button type="submit">Add availability</button></form>
              <div id="tutorScheduleList" class="tutor-record-list"></div>
            </section>

            <section class="tutor-view" data-tutor-panel="lessons">
              <div class="tutor-section-head"><span>PLANNING</span><h2>Build lesson plans</h2><p>Keep your private teaching notes and learner goals organized.</p></div>
              <form class="tutor-editor" onsubmit="saveTutorLesson(event)"><label>Lesson title<input id="tutorLessonTitle" maxlength="100" required placeholder="Fractions review"></label><label>Subject<select id="tutorLessonSubject"><option>English and reading</option><option>Math</option><option>Science</option><option>History and social studies</option><option>Test preparation</option></select></label><label class="is-wide">Plan<textarea id="tutorLessonPlan" rows="4" maxlength="800" required placeholder="Objectives, activities, and materials"></textarea></label><button type="submit">Save lesson plan</button></form>
              <div id="tutorLessonList" class="tutor-record-list"></div>
            </section>

            <section class="tutor-view" data-tutor-panel="assignments">
              <div class="tutor-section-head"><span>SHARED PRACTICE</span><h2>Send an assignment</h2><p>Use the learner account email so the work appears in Tutor Assignments inside their student app.</p></div>
              <form class="tutor-editor" onsubmit="saveTutorAssignment(event)"><label>Learner account email<input id="tutorAssignmentEmail" type="email" maxlength="160" required placeholder="family@example.com"></label><label>Title<input id="tutorAssignmentTitle" maxlength="100" required placeholder="Read and summarize"></label><label>Subject<select id="tutorAssignmentSubject"><option>English and reading</option><option>Math</option><option>Science</option><option>History and social studies</option><option>Test preparation</option></select></label><label>Due date<input id="tutorAssignmentDue" type="date"></label><label class="is-wide">Instructions<textarea id="tutorAssignmentInstructions" rows="4" maxlength="800" required placeholder="Explain what the learner should complete"></textarea></label><button type="submit">Share assignment</button></form>
              <div id="tutorAssignmentList" class="tutor-record-list"></div>
            </section>

            <section class="tutor-view" data-tutor-panel="learners">
              <div class="tutor-section-head"><span>ROSTER</span><h2>Manage your learners</h2><p>Store only the minimum information needed to organize tutoring.</p></div>
              <form class="tutor-editor" onsubmit="saveTutorLearner(event)"><label>Learner display name<input id="tutorLearnerName" maxlength="80" required placeholder="First name or family-approved nickname"></label><label>Grade<input id="tutorLearnerGrade" maxlength="30" required placeholder="Grade 6"></label><label class="is-wide">Learning goal<textarea id="tutorLearnerGoal" rows="3" maxlength="300" required placeholder="What this learner is working toward"></textarea></label><button type="submit">Add learner</button></form>
              <div id="tutorLearnerList" class="tutor-record-list"></div>
            </section>

            <section class="tutor-view" data-tutor-panel="messages">
              <div class="tutor-section-head"><span>COMMUNITY INBOX</span><h2>Family messages</h2><p>Messages sent from community tutor search appear here when database messaging is connected.</p></div>
              <div id="tutorInbox" class="tutor-record-list"><article><b>No messages yet</b><p>New family questions will appear here.</p></article></div>
            </section>
          </main>
        </div>`;
    }
  }

  async function syncTutorProfile(user){
    const client=window.learnMasterSupabase;
    if(!client||!user?.id) return;
    const metadata=user.user_metadata||{};
    const subjects=String(metadata.tutor_subjects||"Homework support").split(",").map(value=>value.trim()).filter(Boolean);
    const qualification=String(metadata.tutor_qualification||"Tutor profile pending qualification review");
    const availability=String(metadata.tutor_availability||"Contact tutor for availability");
    const name=String(metadata.display_name||user.email?.split("@")[0]||"Community tutor");
    try{
      await client.from("learnmaster_tutors").upsert({
        tutor_user_id:user.id,name,qualification,availability,subjects,
        grade_levels:["Pre-K","Kindergarten",...Array.from({length:12},(_,index)=>`Grade ${index+1}`)],
        formats:["online"],active:true
      },{onConflict:"tutor_user_id"});
    }catch(error){ console.warn("Tutor community profile is waiting for its database migration.",error?.message||error); }
  }

  async function enterTutorWorkspace(user){
    tutorWorkspaceUser=user||tutorWorkspaceUser;
    currentPortalRole="tutor";
    loggedIn=true;
    hideProfileChooser?.();
    hidePaywall?.(true);
    if($("loginWall")){
      $("loginWall").style.display="none";
      $("loginWall").setAttribute("aria-hidden","true");
    }
    document.body.classList.remove("login-open");
    document.body.classList.add("tutor-workspace-active");
    const workspace=$("tutorWorkspace");
    if(workspace) workspace.hidden=false;
    readState();
    renderTutorWorkspace();
    await syncTutorProfile(tutorWorkspaceUser);
    await loadTutorWorkspaceData();
    await loadTutorWorkspaceMessages();
  }

  function leaveTutorWorkspace(){
    document.body.classList.remove("tutor-workspace-active");
    const workspace=$("tutorWorkspace");
    if(workspace) workspace.hidden=true;
    tutorWorkspaceUser=null;
  }

  function showTutorWorkspaceView(view,button){
    document.querySelectorAll("[data-tutor-panel]").forEach(panel=>panel.classList.toggle("is-active",panel.dataset.tutorPanel===view));
    document.querySelectorAll("[data-tutor-view]").forEach(item=>item.classList.toggle("is-active",item===button||item.dataset.tutorView===view));
  }

  function renderTutorWorkspace(){
    const name=tutorWorkspaceUser?.user_metadata?.display_name||tutorWorkspaceUser?.email?.split("@")[0]||"Tutor";
    if($("tutorWorkspaceGreeting")) $("tutorWorkspaceGreeting").textContent=`Welcome, ${name}`;
    if($("tutorScheduleCount")) $("tutorScheduleCount").textContent=String(tutorWorkspaceState.schedule.length);
    if($("tutorLessonCount")) $("tutorLessonCount").textContent=String(tutorWorkspaceState.lessons.length);
    if($("tutorLearnerCount")) $("tutorLearnerCount").textContent=String(tutorWorkspaceState.learners.length);
    if($("tutorNextSession")) $("tutorNextSession").textContent=tutorWorkspaceState.schedule[0]?`${tutorWorkspaceState.schedule[0].day} · ${tutorWorkspaceState.schedule[0].start}–${tutorWorkspaceState.schedule[0].end}`:"No session scheduled";
    renderTutorRecords("tutorScheduleList",tutorWorkspaceState.schedule,item=>`<article><b>${safe(item.day)} · ${safe(item.start)}–${safe(item.end)}</b><p>${safe(item.format==="local"?"In person":"Online")}</p></article>`);
    renderTutorRecords("tutorLessonList",tutorWorkspaceState.lessons,item=>`<article><span>${safe(item.subject)}</span><b>${safe(item.title)}</b><p>${safe(item.plan)}</p></article>`);
    renderTutorRecords("tutorAssignmentList",tutorWorkspaceState.assignments,item=>`<article><span>${safe(item.subject)} · ${safe(item.email)}</span><b>${safe(item.title)}</b><p>${safe(item.instructions)}</p><small>${item.due?`Due ${safe(item.due)}`:"No due date"}</small></article>`);
    renderTutorRecords("tutorLearnerList",tutorWorkspaceState.learners,item=>`<article><span>${safe(item.grade)}</span><b>${safe(item.name)}</b><p>${safe(item.goal)}</p></article>`);
  }
  function renderTutorRecords(id,items,template){ const wrap=$(id); if(wrap) wrap.innerHTML=items.length?items.map(template).join(""):'<article><b>Nothing here yet</b><p>Add your first record above.</p></article>'; }
  async function loadTutorWorkspaceData(){
    const client=window.learnMasterSupabase;
    if(!client||!tutorWorkspaceUser?.id) return;
    try{
      const [scheduleResult,lessonResult,assignmentResult,learnerResult]=await Promise.all([
        client.from("learnmaster_tutor_schedule").select("day_name,starts_at,ends_at,format").order("created_at"),
        client.from("learnmaster_tutor_lessons").select("title,subject,plan").order("updated_at",{ascending:false}),
        client.from("learnmaster_tutor_assignments").select("recipient_email,title,subject,instructions,due_on").order("updated_at",{ascending:false}),
        client.from("learnmaster_tutor_learners").select("learner_display_name,grade_level,learning_goal").order("created_at",{ascending:false})
      ]);
      if(!scheduleResult.error) tutorWorkspaceState.schedule=(scheduleResult.data||[]).map(item=>({day:item.day_name,start:String(item.starts_at||"").slice(0,5),end:String(item.ends_at||"").slice(0,5),format:item.format}));
      if(!lessonResult.error) tutorWorkspaceState.lessons=lessonResult.data||[];
      if(!assignmentResult.error) tutorWorkspaceState.assignments=(assignmentResult.data||[]).map(item=>({email:item.recipient_email,title:item.title,subject:item.subject,instructions:item.instructions,due:item.due_on}));
      if(!learnerResult.error) tutorWorkspaceState.learners=(learnerResult.data||[]).map(item=>({name:item.learner_display_name,grade:item.grade_level,goal:item.learning_goal}));
      writeState(); renderTutorWorkspace();
    }catch(error){}
  }
  async function saveRemoteTutorRecord(table,payload){
    const client=window.learnMasterSupabase;
    if(!client||!tutorWorkspaceUser?.id) return;
    try{ await client.from(table).insert({...payload,tutor_user_id:tutorWorkspaceUser.id}); }catch(error){}
  }
  async function saveTutorSchedule(event){ event.preventDefault(); const item={day:$("tutorScheduleDay").value,start:$("tutorScheduleStart").value,end:$("tutorScheduleEnd").value,format:$("tutorScheduleFormat").value}; tutorWorkspaceState.schedule.push(item); writeState(); event.target.reset(); renderTutorWorkspace(); await saveRemoteTutorRecord("learnmaster_tutor_schedule",{day_name:item.day,starts_at:item.start,ends_at:item.end,format:item.format}); }
  async function saveTutorLesson(event){ event.preventDefault(); const item={title:$("tutorLessonTitle").value.trim(),subject:$("tutorLessonSubject").value,plan:$("tutorLessonPlan").value.trim()}; tutorWorkspaceState.lessons.push(item); writeState(); event.target.reset(); renderTutorWorkspace(); await saveRemoteTutorRecord("learnmaster_tutor_lessons",item); }
  async function saveTutorAssignment(event){ event.preventDefault(); const item={email:$("tutorAssignmentEmail").value.trim().toLowerCase(),title:$("tutorAssignmentTitle").value.trim(),subject:$("tutorAssignmentSubject").value,instructions:$("tutorAssignmentInstructions").value.trim(),due:$("tutorAssignmentDue").value||null}; tutorWorkspaceState.assignments.unshift(item); writeState(); event.target.reset(); renderTutorWorkspace(); await saveRemoteTutorRecord("learnmaster_tutor_assignments",{recipient_email:item.email,title:item.title,subject:item.subject,instructions:item.instructions,due_on:item.due}); }
  async function saveTutorLearner(event){ event.preventDefault(); const item={name:$("tutorLearnerName").value.trim(),grade:$("tutorLearnerGrade").value.trim(),goal:$("tutorLearnerGoal").value.trim()}; tutorWorkspaceState.learners.push(item); writeState(); event.target.reset(); renderTutorWorkspace(); await saveRemoteTutorRecord("learnmaster_tutor_learners",{learner_display_name:item.name,grade_level:item.grade,learning_goal:item.goal}); }

  async function loadTutorWorkspaceMessages(){
    const inbox=$("tutorInbox");
    const count=$("tutorMessageCount");
    const client=window.learnMasterSupabase;
    if(!client||!tutorWorkspaceUser?.id){ if(count) count.textContent="0"; return; }
    try{
      const {data,error}=await client.from("learnmaster_tutor_messages").select("id,grade_level,subject,message,created_at,read_at").order("created_at",{ascending:false}).limit(30);
      if(error) throw error;
      if(count) count.textContent=String((data||[]).filter(item=>!item.read_at).length);
      if(inbox) inbox.innerHTML=(data||[]).length?(data||[]).map(item=>`<article><span>${safe(item.grade_level)} · ${safe(item.subject)}</span><b>Family message</b><p>${safe(item.message)}</p><small>${safe(new Date(item.created_at).toLocaleString())}</small></article>`).join(""):'<article><b>No messages yet</b><p>New family questions will appear here.</p></article>';
    }catch(error){ if(count) count.textContent="0"; }
  }

  window.enterTutorWorkspace=enterTutorWorkspace;
  window.leaveTutorWorkspace=leaveTutorWorkspace;
  window.showTutorWorkspaceView=showTutorWorkspaceView;
  window.saveTutorSchedule=saveTutorSchedule;
  window.saveTutorLesson=saveTutorLesson;
  window.saveTutorAssignment=saveTutorAssignment;
  window.saveTutorLearner=saveTutorLearner;
  customElements.define("k12-tutor-portal",K12TutorPortal);
})();
