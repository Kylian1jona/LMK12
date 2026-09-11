(function(){
  "use strict";

  const translations = {
    es:{Home:"Inicio",Grades:"Grados",Reading:"Lectura",Playground:"Zona de juegos",English:"Inglés",Math:"Matemáticas",Science:"Ciencias",History:"Historia",Settings:"Configuración",Shop:"Tienda","Sign out":"Cerrar sesión",User:"Usuario","Switch user":"Cambiar usuario","Subscription details":"Detalles de suscripción","Settings & avatar":"Configuración y avatar","Progress analysis":"Análisis de progreso","Search lessons":"Buscar lecciones","No lessons found.":"No se encontraron lecciones.","Type a grade, subject, or lesson name.":"Escribe un grado, materia o nombre de lección.","Choose a skill.":"Elige una habilidad.","Choose an English skill.":"Elige una habilidad de inglés.",Back:"Atrás",Next:"Siguiente",Start:"Comenzar",Continue:"Continuar",Submit:"Enviar","Try again":"Intentar de nuevo","Correct!":"¡Correcto!"},
    fr:{Home:"Accueil",Grades:"Niveaux",Reading:"Lecture",Playground:"Aire de jeux",English:"Anglais",Math:"Mathématiques",Science:"Sciences",History:"Histoire",Settings:"Paramètres",Shop:"Boutique","Sign out":"Se déconnecter",User:"Utilisateur","Switch user":"Changer d’utilisateur","Subscription details":"Détails de l’abonnement","Settings & avatar":"Paramètres et avatar","Progress analysis":"Analyse des progrès","Search lessons":"Rechercher des leçons","No lessons found.":"Aucune leçon trouvée.","Type a grade, subject, or lesson name.":"Saisissez un niveau, une matière ou une leçon.","Choose a skill.":"Choisissez une compétence.","Choose an English skill.":"Choisissez une compétence en anglais.",Back:"Retour",Next:"Suivant",Start:"Commencer",Continue:"Continuer",Submit:"Valider","Try again":"Réessayer","Correct!":"Correct !"},
    zh:{Home:"首页",Grades:"年级",Reading:"阅读",Playground:"游乐场",English:"英语",Math:"数学",Science:"科学",History:"历史",Settings:"设置",Shop:"商店","Sign out":"退出登录",User:"用户","Switch user":"切换用户","Subscription details":"订阅详情","Settings & avatar":"设置与头像","Progress analysis":"学习进度分析","Search lessons":"搜索课程","No lessons found.":"未找到课程。","Type a grade, subject, or lesson name.":"请输入年级、科目或课程名称。","Choose a skill.":"选择一项技能。","Choose an English skill.":"选择一项英语技能。",Back:"返回",Next:"下一步",Start:"开始",Continue:"继续",Submit:"提交","Try again":"再试一次","Correct!":"回答正确！"},
    hi:{Home:"होम",Grades:"कक्षाएँ",Reading:"पढ़ना",Playground:"खेल का मैदान",English:"अंग्रेज़ी",Math:"गणित",Science:"विज्ञान",History:"इतिहास",Settings:"सेटिंग्स",Shop:"दुकान","Sign out":"साइन आउट",User:"उपयोगकर्ता","Switch user":"उपयोगकर्ता बदलें","Subscription details":"सदस्यता विवरण","Settings & avatar":"सेटिंग्स और अवतार","Progress analysis":"प्रगति विश्लेषण","Search lessons":"पाठ खोजें","No lessons found.":"कोई पाठ नहीं मिला।","Type a grade, subject, or lesson name.":"कक्षा, विषय या पाठ का नाम लिखें।","Choose a skill.":"एक कौशल चुनें।","Choose an English skill.":"अंग्रेज़ी का कौशल चुनें।",Back:"वापस",Next:"अगला",Start:"शुरू करें",Continue:"जारी रखें",Submit:"जमा करें","Try again":"फिर कोशिश करें","Correct!":"सही!"}
  };

  Object.assign(translations.es,{
    "Simple learning games for every grade.":"Juegos educativos sencillos para todos los grados.",Username:"Nombre de usuario",Password:"Contraseña","Log in":"Iniciar sesión","Sign up":"Registrarse","New username":"Nuevo nombre de usuario","Display name":"Nombre visible","Create account":"Crear cuenta","Back to login":"Volver al inicio de sesión",
    "Choose a subject":"Elige una materia",Points:"Puntos",Learners:"Estudiantes",Lesson:"Lección",Check:"Comprobar",Restart:"Reiniciar","Great Job!":"¡Excelente trabajo!","Question text…":"Texto de la pregunta…","🔊 Replay":"🔊 Repetir","Voice: On":"Voz: activada","Voice: Off":"Voz: desactivada",Trial:"Prueba",Off:"Desactivada",
    "Choose a plan (or start a 5-minute trial) to use the website.":"Elige un plan (o inicia una prueba de 5 minutos) para usar el sitio.","Locked until plan":"Bloqueado hasta elegir un plan","Trial left:":"Prueba restante:",Starter:"Inicial",Plus:"Plus",Max:"Máximo","Pre-K lessons":"Lecciones de preescolar","Shop locked":"Tienda bloqueada","Shop unlocked":"Tienda desbloqueada","Rewards + toys":"Premios y juguetes","All grades (included)":"Todos los grados (incluidos)","All subjects included":"Todas las materias incluidas","Choose Starter":"Elegir Inicial","Choose Plus":"Elegir Plus","Choose Max":"Elegir Máximo","Start 5-Minute Trial":"Iniciar prueba de 5 minutos",Checkout:"Pagar",Plan:"Plan",Price:"Precio",Discount:"Descuento",Total:"Total",Apply:"Aplicar",Cancel:"Cancelar","Pay & Activate":"Pagar y activar",
    "Choose a history skill.":"Elige una habilidad de historia.","Choose a math skill.":"Elige una habilidad de matemáticas.","Choose a science skill.":"Elige una habilidad de ciencias.","Reading Skills":"Habilidades de lectura",Vocabulary:"Vocabulario",Language:"Lenguaje",Practice:"Práctica",Numbers:"Números",Algebra:"Álgebra",Geometry:"Geometría","Life Science":"Ciencias de la vida",Ecosystems:"Ecosistemas",Forces:"Fuerzas",Matter:"Materia",Genetics:"Genética",Biology:"Biología",Ecology:"Ecología","Memory Match":"Juego de memoria","Speed Challenge":"Desafío de velocidad","Fill in the Blank":"Completar el espacio","Sentence Editing":"Edición de oraciones"
  });
  Object.assign(translations.fr,{
    "Simple learning games for every grade.":"Des jeux éducatifs simples pour tous les niveaux.",Username:"Nom d’utilisateur",Password:"Mot de passe","Log in":"Se connecter","Sign up":"S’inscrire","New username":"Nouveau nom d’utilisateur","Display name":"Nom affiché","Create account":"Créer un compte","Back to login":"Retour à la connexion",
    "Choose a subject":"Choisissez une matière",Points:"Points",Learners:"Élèves",Lesson:"Leçon",Check:"Vérifier",Restart:"Recommencer","Great Job!":"Bravo !","Question text…":"Texte de la question…","🔊 Replay":"🔊 Réécouter","Voice: On":"Voix : activée","Voice: Off":"Voix : désactivée",Trial:"Essai",Off:"Désactivé",
    "Choose a plan (or start a 5-minute trial) to use the website.":"Choisissez une formule (ou lancez un essai de 5 minutes) pour utiliser le site.","Locked until plan":"Bloqué jusqu’au choix d’une formule","Trial left:":"Essai restant :",Starter:"Débutant",Plus:"Plus",Max:"Max","Pre-K lessons":"Leçons préscolaires","Shop locked":"Boutique verrouillée","Shop unlocked":"Boutique accessible","Rewards + toys":"Récompenses et jouets","All grades (included)":"Tous les niveaux (inclus)","All subjects included":"Toutes les matières incluses","Choose Starter":"Choisir Débutant","Choose Plus":"Choisir Plus","Choose Max":"Choisir Max","Start 5-Minute Trial":"Lancer l’essai de 5 minutes",Checkout:"Paiement",Plan:"Formule",Price:"Prix",Discount:"Réduction",Total:"Total",Apply:"Appliquer",Cancel:"Annuler","Pay & Activate":"Payer et activer",
    "Choose a history skill.":"Choisissez une compétence en histoire.","Choose a math skill.":"Choisissez une compétence en mathématiques.","Choose a science skill.":"Choisissez une compétence en sciences.","Reading Skills":"Compétences de lecture",Vocabulary:"Vocabulaire",Language:"Langue",Practice:"Entraînement",Numbers:"Nombres",Algebra:"Algèbre",Geometry:"Géométrie","Life Science":"Sciences de la vie",Ecosystems:"Écosystèmes",Forces:"Forces",Matter:"Matière",Genetics:"Génétique",Biology:"Biologie",Ecology:"Écologie","Memory Match":"Jeu de mémoire","Speed Challenge":"Défi de rapidité","Fill in the Blank":"Compléter le blanc","Sentence Editing":"Correction de phrases"
  });
  Object.assign(translations.zh,{
    "Simple learning games for every grade.":"适合各年级的简单学习游戏。",Username:"用户名",Password:"密码","Log in":"登录","Sign up":"注册","New username":"新用户名","Display name":"显示名称","Create account":"创建账户","Back to login":"返回登录",
    "Choose a subject":"选择科目",Points:"积分",Learners:"学习者",Lesson:"课程",Check:"检查",Restart:"重新开始","Great Job!":"做得好！","Question text…":"题目内容…","🔊 Replay":"🔊 重播","Voice: On":"语音：开启","Voice: Off":"语音：关闭",Trial:"试用",Off:"关闭",
    "Choose a plan (or start a 5-minute trial) to use the website.":"选择套餐（或开始5分钟试用）以使用网站。","Locked until plan":"选择套餐后解锁","Trial left:":"剩余试用：",Starter:"入门版",Plus:"增强版",Max:"全能版","Pre-K lessons":"学前课程","Shop locked":"商店未解锁","Shop unlocked":"商店已解锁","Rewards + toys":"奖励和玩具","All grades (included)":"所有年级（已包含）","All subjects included":"包含所有科目","Choose Starter":"选择入门版","Choose Plus":"选择增强版","Choose Max":"选择全能版","Start 5-Minute Trial":"开始5分钟试用",Checkout:"结账",Plan:"套餐",Price:"价格",Discount:"折扣",Total:"总计",Apply:"应用",Cancel:"取消","Pay & Activate":"付款并激活",
    "Choose a history skill.":"选择一项历史技能。","Choose a math skill.":"选择一项数学技能。","Choose a science skill.":"选择一项科学技能。","Reading Skills":"阅读技能",Vocabulary:"词汇",Language:"语言",Practice:"练习",Numbers:"数字",Algebra:"代数",Geometry:"几何","Life Science":"生命科学",Ecosystems:"生态系统",Forces:"力",Matter:"物质",Genetics:"遗传学",Biology:"生物学",Ecology:"生态学","Memory Match":"记忆配对","Speed Challenge":"速度挑战","Fill in the Blank":"填空","Sentence Editing":"句子修改"
  });
  Object.assign(translations.hi,{
    "Simple learning games for every grade.":"हर कक्षा के लिए आसान सीखने के खेल।",Username:"उपयोगकर्ता नाम",Password:"पासवर्ड","Log in":"लॉग इन","Sign up":"साइन अप","New username":"नया उपयोगकर्ता नाम","Display name":"दिखाई देने वाला नाम","Create account":"खाता बनाएँ","Back to login":"लॉग इन पर वापस जाएँ",
    "Choose a subject":"विषय चुनें",Points:"अंक",Learners:"विद्यार्थी",Lesson:"पाठ",Check:"जाँचें",Restart:"फिर शुरू करें","Great Job!":"बहुत बढ़िया!","Question text…":"प्रश्न का पाठ…","🔊 Replay":"🔊 फिर सुनें","Voice: On":"आवाज़: चालू","Voice: Off":"आवाज़: बंद",Trial:"परीक्षण",Off:"बंद",
    "Choose a plan (or start a 5-minute trial) to use the website.":"वेबसाइट इस्तेमाल करने के लिए योजना चुनें (या 5 मिनट का परीक्षण शुरू करें)।","Locked until plan":"योजना चुनने तक बंद","Trial left:":"परीक्षण शेष:",Starter:"स्टार्टर",Plus:"प्लस",Max:"मैक्स","Pre-K lessons":"प्री-के पाठ","Shop locked":"दुकान बंद","Shop unlocked":"दुकान खुली","Rewards + toys":"इनाम और खिलौने","All grades (included)":"सभी कक्षाएँ (शामिल)","All subjects included":"सभी विषय शामिल","Choose Starter":"स्टार्टर चुनें","Choose Plus":"प्लस चुनें","Choose Max":"मैक्स चुनें","Start 5-Minute Trial":"5 मिनट का परीक्षण शुरू करें",Checkout:"चेकआउट",Plan:"योजना",Price:"मूल्य",Discount:"छूट",Total:"कुल",Apply:"लागू करें",Cancel:"रद्द करें","Pay & Activate":"भुगतान करके सक्रिय करें",
    "Choose a history skill.":"इतिहास का कौशल चुनें।","Choose a math skill.":"गणित का कौशल चुनें।","Choose a science skill.":"विज्ञान का कौशल चुनें।","Reading Skills":"पठन कौशल",Vocabulary:"शब्दावली",Language:"भाषा",Practice:"अभ्यास",Numbers:"संख्याएँ",Algebra:"बीजगणित",Geometry:"ज्यामिति","Life Science":"जीवन विज्ञान",Ecosystems:"पारिस्थितिकी तंत्र",Forces:"बल",Matter:"पदार्थ",Genetics:"आनुवंशिकी",Biology:"जीवविज्ञान",Ecology:"पारिस्थितिकी","Memory Match":"याददाश्त मिलान","Speed Challenge":"गति चुनौती","Fill in the Blank":"खाली स्थान भरें","Sentence Editing":"वाक्य संपादन"
  });
  Object.assign(translations.es,{
    "Interactive Labs":"Laboratorios interactivos","INTERACTIVE LESSON":"LECCIÓN INTERACTIVA","Change the controls, then run the investigation.":"Cambia los controles y luego realiza la investigación.","Run experiment":"Realizar experimento","Analyze selections":"Analizar selecciones","Explain what happened":"Explica lo que ocurrió","Click or drag tools into the workspace.":"Haz clic o arrastra herramientas al espacio de trabajo.","Use the evidence from your investigation and try again.":"Usa la evidencia de tu investigación e inténtalo de nuevo.",Mass:"Masa",Stiffness:"Rigidez",Gravity:"Gravedad",Friction:"Fricción",Angle:"Ángulo",Speed:"Velocidad","Air resistance":"Resistencia del aire",Force:"Fuerza",Volume:"Volumen",Temperature:"Temperatura",Humidity:"Humedad",Price:"Precio","Discount %":"Descuento %","Tax %":"Impuesto %","Virtual Circuit Board":"Tablero de circuitos virtual","Mass and Springs Lab":"Laboratorio de masas y resortes","Projectile Motion Catapult":"Catapulta de movimiento de proyectiles","Natural Selection Simulator":"Simulador de selección natural","Water Cycle Slider":"Control del ciclo del agua","Virtual Microscope":"Microscopio virtual","Density Lab":"Laboratorio de densidad","Food Web Lab":"Laboratorio de red alimentaria","Motion and Forces Lab":"Laboratorio de movimiento y fuerzas","Cell Lab":"Laboratorio celular","Coordinate Plane Explorer":"Explorador del plano cartesiano","Equation Balance Lab":"Laboratorio de equilibrio de ecuaciones","Probability Lab":"Laboratorio de probabilidad","Scale Drawing Studio":"Estudio de dibujos a escala","Percent Shopping Lab":"Laboratorio de compras con porcentajes","Historical Map Explorer":"Explorador de mapas históricos","Primary Source Lab":"Laboratorio de fuentes primarias","Timeline Builder":"Constructor de líneas de tiempo","Artifact Explorer":"Explorador de artefactos","Government Decision Lab":"Laboratorio de decisiones gubernamentales","Story Detective":"Detective de historias","Editing Desk":"Mesa de edición","Build-a-Paragraph":"Construye un párrafo","Word Workshop":"Taller de palabras","Two-Sides Text Lab":"Laboratorio de dos perspectivas"
  });
  Object.assign(translations.fr,{
    "Interactive Labs":"Laboratoires interactifs","INTERACTIVE LESSON":"LEÇON INTERACTIVE","Change the controls, then run the investigation.":"Modifiez les réglages, puis lancez l'expérience.","Run experiment":"Lancer l'expérience","Analyze selections":"Analyser les choix","Explain what happened":"Expliquez ce qui s'est passé","Click or drag tools into the workspace.":"Cliquez ou faites glisser les outils dans l'espace de travail.","Use the evidence from your investigation and try again.":"Utilisez les observations de votre expérience et réessayez.",Mass:"Masse",Stiffness:"Rigidité",Gravity:"Gravité",Friction:"Frottement",Angle:"Angle",Speed:"Vitesse","Air resistance":"Résistance de l'air",Force:"Force",Volume:"Volume",Temperature:"Température",Humidity:"Humidité",Price:"Prix","Discount %":"Réduction %","Tax %":"Taxe %","Virtual Circuit Board":"Circuit électrique virtuel","Mass and Springs Lab":"Laboratoire masses-ressorts","Projectile Motion Catapult":"Catapulte de mouvement projectile","Natural Selection Simulator":"Simulateur de sélection naturelle","Water Cycle Slider":"Simulateur du cycle de l'eau","Virtual Microscope":"Microscope virtuel","Density Lab":"Laboratoire de densité","Food Web Lab":"Laboratoire du réseau alimentaire","Motion and Forces Lab":"Laboratoire du mouvement et des forces","Cell Lab":"Laboratoire cellulaire","Coordinate Plane Explorer":"Explorateur du plan repéré","Equation Balance Lab":"Balance d'équations","Probability Lab":"Laboratoire de probabilités","Scale Drawing Studio":"Studio de dessin à l'échelle","Percent Shopping Lab":"Laboratoire des pourcentages","Historical Map Explorer":"Explorateur de cartes historiques","Primary Source Lab":"Laboratoire de sources primaires","Timeline Builder":"Constructeur de chronologie","Artifact Explorer":"Explorateur d'objets historiques","Government Decision Lab":"Laboratoire de décisions publiques","Story Detective":"Détective littéraire","Editing Desk":"Atelier de correction","Build-a-Paragraph":"Construire un paragraphe","Word Workshop":"Atelier des mots","Two-Sides Text Lab":"Laboratoire des deux points de vue"
  });
  Object.assign(translations.zh,{
    "Interactive Labs":"互动实验室","INTERACTIVE LESSON":"互动课程","Change the controls, then run the investigation.":"调整控件，然后运行探究。","Run experiment":"运行实验","Analyze selections":"分析选择","Explain what happened":"解释发生了什么","Click or drag tools into the workspace.":"点击或拖动工具到工作区。","Use the evidence from your investigation and try again.":"使用探究证据再试一次。",Mass:"质量",Stiffness:"刚度",Gravity:"重力",Friction:"摩擦力",Angle:"角度",Speed:"速度","Air resistance":"空气阻力",Force:"力",Volume:"体积",Temperature:"温度",Humidity:"湿度",Price:"价格","Discount %":"折扣 %","Tax %":"税率 %","Virtual Circuit Board":"虚拟电路板","Mass and Springs Lab":"质量与弹簧实验室","Projectile Motion Catapult":"抛体运动弹射器","Natural Selection Simulator":"自然选择模拟器","Water Cycle Slider":"水循环调节器","Virtual Microscope":"虚拟显微镜","Density Lab":"密度实验室","Food Web Lab":"食物网实验室","Motion and Forces Lab":"运动与力实验室","Cell Lab":"细胞实验室","Coordinate Plane Explorer":"坐标平面探索器","Equation Balance Lab":"方程天平实验室","Probability Lab":"概率实验室","Scale Drawing Studio":"比例图工作室","Percent Shopping Lab":"百分比购物实验室","Historical Map Explorer":"历史地图探索器","Primary Source Lab":"一手资料实验室","Timeline Builder":"时间线构建器","Artifact Explorer":"文物探索器","Government Decision Lab":"政府决策实验室","Story Detective":"故事侦探","Editing Desk":"编辑工作台","Build-a-Paragraph":"段落构建器","Word Workshop":"词语工作坊","Two-Sides Text Lab":"双观点文本实验室"
  });
  Object.assign(translations.hi,{
    "Interactive Labs":"इंटरैक्टिव प्रयोगशालाएँ","INTERACTIVE LESSON":"इंटरैक्टिव पाठ","Change the controls, then run the investigation.":"नियंत्रण बदलें, फिर जाँच चलाएँ।","Run experiment":"प्रयोग चलाएँ","Analyze selections":"चयनों का विश्लेषण करें","Explain what happened":"बताएँ कि क्या हुआ","Click or drag tools into the workspace.":"औज़ारों को कार्यक्षेत्र में क्लिक या ड्रैग करें।","Use the evidence from your investigation and try again.":"अपनी जाँच के प्रमाण का उपयोग करके फिर प्रयास करें।",Mass:"द्रव्यमान",Stiffness:"कठोरता",Gravity:"गुरुत्व",Friction:"घर्षण",Angle:"कोण",Speed:"गति","Air resistance":"वायु प्रतिरोध",Force:"बल",Volume:"आयतन",Temperature:"तापमान",Humidity:"आर्द्रता",Price:"मूल्य","Discount %":"छूट %","Tax %":"कर %","Virtual Circuit Board":"वर्चुअल सर्किट बोर्ड","Mass and Springs Lab":"द्रव्यमान और स्प्रिंग प्रयोगशाला","Projectile Motion Catapult":"प्रक्षेप्य गति कैटापल्ट","Natural Selection Simulator":"प्राकृतिक चयन सिम्युलेटर","Water Cycle Slider":"जल चक्र नियंत्रक","Virtual Microscope":"वर्चुअल माइक्रोस्कोप","Density Lab":"घनत्व प्रयोगशाला","Food Web Lab":"खाद्य जाल प्रयोगशाला","Motion and Forces Lab":"गति और बल प्रयोगशाला","Cell Lab":"कोशिका प्रयोगशाला","Coordinate Plane Explorer":"निर्देशांक तल अन्वेषक","Equation Balance Lab":"समीकरण संतुलन प्रयोगशाला","Probability Lab":"प्रायिकता प्रयोगशाला","Scale Drawing Studio":"स्केल ड्राइंग स्टूडियो","Percent Shopping Lab":"प्रतिशत खरीदारी प्रयोगशाला","Historical Map Explorer":"ऐतिहासिक मानचित्र अन्वेषक","Primary Source Lab":"प्राथमिक स्रोत प्रयोगशाला","Timeline Builder":"समयरेखा निर्माता","Artifact Explorer":"कलाकृति अन्वेषक","Government Decision Lab":"सरकारी निर्णय प्रयोगशाला","Story Detective":"कहानी जासूस","Editing Desk":"संपादन डेस्क","Build-a-Paragraph":"अनुच्छेद बनाएँ","Word Workshop":"शब्द कार्यशाला","Two-Sides Text Lab":"दो पक्ष पाठ प्रयोगशाला"
  });
  const originals = new WeakMap();
  let current = "en";
  let translating = false;

  function translatedText(source, language){
    const table = translations[language] || {};
    if(table[source]) return table[source];
    const decorated = source.match(/^([^\p{L}\p{N}]*)(.*)$/u);
    if(decorated && decorated[1] && table[decorated[2]]) return decorated[1] + table[decorated[2]];
    const grade = source.match(/^Grade (\d+)(.*)$/);
    if(grade){
      const labels = {es:`Grado ${grade[1]}`,fr:`Niveau ${grade[1]}`,zh:`${grade[1]}年级`,hi:`कक्षा ${grade[1]}`};
      const suffix = grade[2].replace(/\b(English|Math|Science|History)\b/g,word=>table[word] || word);
      return `${labels[language] || `Grade ${grade[1]}`}${suffix}`;
    }
    const backToGrade = source.match(/^Back to Grade (\d+)$/);
    if(backToGrade){
      const labels={es:`Volver al grado ${backToGrade[1]}`,fr:`Retour au niveau ${backToGrade[1]}`,zh:`返回${backToGrade[1]}年级`,hi:`कक्षा ${backToGrade[1]} पर वापस जाएँ`};
      return labels[language] || source;
    }
    const question = source.match(/^Question (\d+) of (\d+)$/);
    if(question){
      const labels={es:`Pregunta ${question[1]} de ${question[2]}`,fr:`Question ${question[1]} sur ${question[2]}`,zh:`第${question[1]}题，共${question[2]}题`,hi:`प्रश्न ${question[1]}, कुल ${question[2]}`};
      return labels[language] || source;
    }
    const investigation = source.match(/^Investigation (\d+)(.*)$/);
    if(investigation){
      const labels={es:`Investigación ${investigation[1]}`,fr:`Expérience ${investigation[1]}`,zh:`探究 ${investigation[1]}`,hi:`जाँच ${investigation[1]}`};
      return `${labels[language] || `Investigation ${investigation[1]}`}${investigation[2]}`;
    }
    return source;
  }

  function translateTextNode(node){
    if(!node.nodeValue || !node.nodeValue.trim()) return;
    if(node.parentElement?.closest("script,style,textarea,[data-no-translate]")) return;
    if(!originals.has(node)) originals.set(node,node.nodeValue);
    const original = originals.get(node);
    const trimmed = original.trim();
    node.nodeValue = original.match(/^\s*/)[0] + translatedText(trimmed,current) + original.match(/\s*$/)[0];
  }

  function translateElement(root=document.body){
    if(!root) return;
    translating = true;
    if(root.nodeType === Node.TEXT_NODE) translateTextNode(root);
    else {
      const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())) translateTextNode(node);
      root.querySelectorAll?.("[placeholder],[aria-label],[title]").forEach(el=>{
        ["placeholder","aria-label","title"].forEach(attr=>{
          if(!el.hasAttribute(attr)) return;
          const dataName = `i18n${attr.replace(/(^|-)(.)/g,(_m,_d,c)=>c.toUpperCase())}`;
          if(!el.dataset[dataName]) el.dataset[dataName]=el.getAttribute(attr);
          el.setAttribute(attr,translatedText(el.dataset[dataName],current));
        });
      });
    }
    translating = false;
  }

  window.setLanguage = function(language){
    current = translations[language] ? language : "en";
    learnMasterStore.setItem("k12Language",current);
    document.documentElement.lang = current === "zh" ? "zh-Hans" : current;
    const picker=document.getElementById("languagePicker");
    if(picker) picker.value=current;
    translateElement();
  };
  window.k12Translate=source=>translatedText(String(source),current);
  window.k12CurrentLanguage=()=>current;

  document.addEventListener("DOMContentLoaded",()=>{
    current=learnMasterStore.getItem("k12Language") || "en";
    window.setLanguage(current);
    new MutationObserver(records=>{
      if(translating) return;
      records.forEach(record=>record.addedNodes.forEach(node=>translateElement(node)));
    }).observe(document.body,{childList:true,subtree:true});
  });
})();
