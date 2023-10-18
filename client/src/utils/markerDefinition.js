/* eslint-disable */

export const getMarkerDefinition = (marker) => {
  let data = "";

  if (marker === 160) {
    data = `Albumin is the most abundant circulating protein found in plasma. It represents half of the total protein content of plasma in healthy human patients. Albumin is synthesized by liver hepatocytes and rapidly excreted into the bloodstream at the rate of about 10 gm to 15 gm per day.  /*https://pubmed.ncbi.nlm.nih.gov/29083605/*/
      `;
  }

  if (marker === 167) {
    data = `Aldosterone (ALD) is a hormone made by the adrenal glands, two small glands located above the kidneys. ALD helps control blood pressure and maintain healthy levels of sodium and potassium. Sodium and potassium are electrolytes. Electrolytes are minerals that help balance the amount of fluids in the body and keep nerves and muscles working properly.  ALD tests are often combined with tests for renin, a hormone made by the kidneys. Renin signals the adrenal glands to make ALD. The combined tests are sometimes called an aldosterone-renin ratio test or aldosterone-plasma renin activity.  /*https://medlineplus.gov/lab-tests/aldosterone-test/*/
      `;
  }

  if (marker === 254) {
    data = `Antinuclear Antibodies (ANA) looks for antinuclear antibodies in the blood.  An ANA test is used to help diagnose autoimmune disorders such as  Lupus and Rheumatoid arthritis.  /*https://medlineplus.gov/lab-tests/ana-antinuclear-antibody-test/ */
      `;
  }

  if (marker === 170) {
    data = `Alkaline Phosphatase is an enzyme found throughout the body, mainly in the liver, bone, kidney, and digestive tract. /*self*/
      `;
  }

  if (marker === 224) {
    data = `ALT (alanine transaminase) is an enzyme found mostly in the liver. When liver cells are damaged, they release ALT into the bloodstream. /*https://medlineplus.gov/lab-tests/alt-blood-test/*/
      `;
  }

  if (marker === 3000) {
    data = `Anion gap shows the levels of acid in blood. The test is based on electrolytes, which are electrically charged minerals that help control the balance of acids and bases. The anion gap is a measurement of the difference between the negatively charged and positively charged electrolytes.  /*https://medlineplus.gov/lab-tests/anion-gap-blood-test/ edited*/
      `;
  }

  if (marker === 301) {
    data = `AST (aspartate aminotransferase) is an enzyme that is found mostly in the liver, but also in muscles. When the liver is damaged, it releases AST into the bloodstream.  /*https://medlineplus.gov/lab-tests/ast-test/ edited*/
      `;
  }

  if (marker === 113 || marker === 328) {
    data = `Basophils are a type of white blood cell and a type of granulocyte, which is a type of white blood cell that has small granules.  Granules are small particles with enzymes that are released during allergic reactions and asthma. /*https://www.cancer.gov/publications/dictionaries/cancer-terms/def/basophil edited */
      `;
  }

  if (marker === 345 || marker === 348) {
    data = `Bilirubin is a yellowish substance made during the body's normal process of breaking down red blood cells. Bilirubin is found in bile, a fluid in the liver that helps one digest food. If the liver is healthy, it will remove most of the bilirubin from the body. If the liver is damaged, bilirubin can leak out of the liver and into the blood. When too much bilirubin gets into the bloodstream, it can cause jaundice, a condition that causes skin and eyes to turn yellow. /*https://medlineplus.gov/lab-tests/bilirubin-blood-test/ */
      `;
  }

  if (marker === 1881) {
    data = `BUN (Blood Urea Nitrogen) is one of the waste products removed from the blood by the kidneys. Higher than normal BUN levels may be a sign that the kidneys aren't working efficiently.  The main job of the kidneys is to remove waste and extra fluid from your body. If one has kidney disease, this waste material can build up in the blood and lead to health problems, including high blood pressure, anemia, and heart disease.  /*https://medlineplus.gov/lab-tests/bun-blood-urea-nitrogen/ */
      `;
  }

  if (marker === 384) {
    data = `C-peptide and insulin are released from the pancreas at the same time and in about equal amounts. C-peptide stays in the body longer than insulin. /*https://medlineplus.gov/lab-tests/c-peptide-test/ */
      C-peptide has a half-life of 20–30 minutes, while insulin has a half-life of 3–5 minutes. /*https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5446389/ */
      `;
  }

  if (marker === 394) {
    data = `C-reactive protein (CRP) is a protein made by your liver. It's sent into your bloodstream in response to inflammation.
      `;
  }

  if (marker === 426) {
    data = `Calcium is one of the most important minerals in your body. You need calcium for healthy bones and teeth. Calcium is also essential for proper functioning of your nerves, muscles, and heart. About 99% of your body's calcium is stored in your bones. The remaining 1% circulates in the blood. If there is too much or too little calcium in the blood, it may be a sign of bone disease, thyroid disease, kidney disease, or other medical conditions. /*https://medlineplus.gov/lab-tests/calcium-blood-test/ */
      `;
  }

  if (marker === 432) {
    data = `Ionized calcium is calcium in your blood that is not attached to proteins. It is also called free calcium.
      `;
    // https://medlineplus.gov/
  }

  if (marker === 446) {
    data = `Carbon dioxide (CO2) is an odorless, colorless gas. It is a waste product made by the body. Your blood carries carbon dioxide to the lungs. One breathes out carbon dioxide and breathes in oxygen all day. /*https://medlineplus.gov/lab-tests/carbon-dioxide-co2-in-blood/ */
      `;
  }

  if (marker === 502) {
    data = `Chloride is a type of electrolyte. Electrolytes are electrically charged minerals that help control the amount of fluids and the balance of acids and bases in the body. Chloride is often measured along with other electrolytes to diagnose or monitor conditions such as kidney disease, heart failure, liver disease, and high blood pressure.
      `;
    // medlineplus.gov
  }

  if (marker === 584 || marker === 593) {
    data = `Cortisol is made by your adrenal glands, two small glands located above the kidneys. `;
    // medlineplus.gov
  }

  if (marker === 611 || marker === 619) {
    data = `Creatinine is a waste product made by the muscles as part of regular, everyday activity. Normally, the kidneys filter creatinine from the blood and send it out of the body in the urine. If there is a problem with the kidneys, creatinine can build up in the blood and less will be released in urine.
      `;
    // medlineplus.gov
  }

  if (marker === 675) {
    data = `DHEA Sulfate (dehydroepiandrosterone sulfate) is a male sex hormone that is found in both men and women. DHEAS plays an important role in making the male sex hormone testosterone and the female sex hormone estrogen.  DHEAS is mostly made in the adrenal glands, two small glands located above the kidneys. Smaller amounts of DHEAS are made in a man’s testicles and in a woman’s ovaries.
      `;
    // medlineplus.gov
  }

  if (marker === 119 || marker === 750) {
    data = `Eosinophils are a type of white blood cell. They help fight off infections and play a role in your body's immune response.`;
    // medlineplus.gov
  }

  if (marker === 3001) {
    data = `Erythrocyte sedimentation rate (ESR) measures how quickly erythrocytes (red blood cells) settle at the bottom of a test tube that contains a blood sample. Normally, red blood cells settle relatively slowly. A faster-than-normal rate may indicate inflammation in the body. Inflammation is part of your immune response system.
      `;
    // medlineplus.gov
  }

  if (marker === 732 || marker === 733 || marker === 734 || marker === 858) {
    data = `Estimated glomerular filtration rate (eGFR) shows how well the kidneys are working. The kidneys have tiny filters called glomeruli. These filters help remove waste and excess fluid from the blood. A GFR test estimates how much blood passes through these filters each minute. A GFR can be measured directly, but it is a complicated test, requiring specialized providers. So GFR is most often estimated using a test called an estimated GFR or eGFR.
      `;
    // medlineplus.gov
  }

  if (marker === 764) {
    data = `Estrogen Total Serum is the sum of estrone (E1), estradiol (E2), and estriol (E3).
      `;
    //self
  }

  if (marker === 791) {
    data = `Ferritin is a intracellular protein that stores iron and releases it in a controlled fashion. /*Wikipedia*/
      Ferritin is found in virtually all cells of the body and serves as the cellular storage repository for iron. /*Labcorp*/
      Decreased in iron deficiency anemia and increased in iron overload. Ferritin levels correlate with and are useful in evaluation of total body storage iron. /*Labcorp*/
      Low levels of ferritin can be found when iron stores are exhausted, well before the serum iron level has become affected. In the setting of anemia, low serum ferritin is a very specific biomarker for iron deficiency anemia. /*Labcorp*/
      Serum ferritin decrease is the earliest indicator of iron deficiency if inflammation is absent. /*Labcorp TIBC page*/
      Ferritin is an acute-phase reactant.  /*Labcorp*/
      Ferritin is increased in inflammation, and iron-deficient patients undergoing inflammatory responses may have normal ferritin values. /*https://academic.oup.com/ajcp/article/145/6/778/2836697*/
      `;
    // https://www.labcorp.com/tests/004598/ferritin
  }

  if (marker === 821) {
    data = `Follicle-Stimulating Hormone (FSH) is made by your pituitary gland, a small gland located underneath the brain. FSH plays an important role in sexual development and functioning.
      In women, FSH helps control the menstrual cycle and stimulates the growth of eggs in the ovaries. FSH levels in women change throughout the menstrual cycle, with the highest levels happening just before an egg is released by the ovary. This is known as ovulation.
      In men, FSH helps control the production of sperm. Normally, FSH levels in men do not change very much.
      In children, FSH levels are usually low until puberty, when levels begin to rise. In girls, it helps signal the ovaries to make estrogen. In boys, it helps signal the testes to make testosterone.
      `;
    // medlineplus.gov
  }

  if (marker === 859) {
    data = `Gamma-glutamyl transferase (GGT) is an enzyme found throughout the body, but it is mostly found in the liver. When the liver is damaged, GGT may leak into the bloodstream. High levels of GGT in the blood may be a sign of liver disease or damage to the bile ducts. Bile ducts are tubes that carry bile in and out of the liver. Bile is a fluid made by the liver. It is important for digestion.  A GGT test can't diagnose the specific cause of liver disease. So it is usually done along with or after other liver function tests, most often an alkaline phosphatase (ALP) test. ALP is another type of liver enzyme. It's often used to help diagnose bone disorders as well as liver disease.
      `;
    // medlineplus.gov
  }

  if (marker === 864) {
    data = `Globulins are a group of proteins in your blood. They are made in your liver by your immune system. Globulins play an important role in liver function, blood clotting, and fighting infection. 
      `;
    // medlineplus.gov
  }

  if (marker === 866) {
    data = `Glucose is the main sugar found in blood. It comes from the food one eats, and is the body's main source of energy. The blood carries glucose to all of the body's cells to use for energy.
      `;
    // https://medlineplus.gov/bloodsugar.html
    // https://medlineplus.gov/lab-tests/blood-glucose-test/
  }

  if (marker === 887) {
    data = `GlycoMark measures 1,5-Anhydroglucitol (1,5-AG), a glucose-like sugar found in most foods.  GlycoMark detects recent hyperglycemia and hyperglycemic excursions.
      `;
    // GlycoMark website
  }

  if (marker === 944) {
    data = `Helicobacter pylori (H. pylori) is a type of bacteria that infects the digestive system. Many people with H. pylori will never have symptoms of infection. But for others, the bacteria can cause a variety of digestive disorders. These include gastritis (inflammation of the stomach), peptic ulcers (sores in the stomach, small intestine, or esophagus), and certain types of stomach cancer.
      `;
    // medlineplus.gov
  }

  if (marker === 947) {
    data = `Hematocrit is the volume percentage of red blood cells in blood.
      `;
    // Wikipedia
  }

  if (marker === 950) {
    data = `Hemoglobin A1c (HbA1c) measures the amount of glucose attached to hemoglobin. Hemoglobin is the part of red blood cells that carries oxygen from your lungs to the rest of the body. An HbA1c test shows what the average amount of glucose attached to hemoglobin has been over the past three months. It's a three-month average because that's typically how long a red blood cell lives.
      `;
    // medlineplus.gov
  }

  if (marker === 948) {
    data = `Hemoglobin is the iron-containing oxygen-transport protein in red blood cells. Hemoglobin in blood carries oxygen from the lungs to the rest of the body. There it releases the oxygen to permit aerobic respiration to provide energy to power the functions of the organism in the process called metabolism.
      `; //wiki edited

    // old medlineplus.gov: Hemoglobin is a protein in the red blood cells that carries oxygen from the lungs to the rest of the body.
  }

  if (marker === 999) {
    data = `Homocysteine is a type of amino acid used to make proteins. Normally, vitamin B12, vitamin B6, and folic acid break down homocysteine and change it into other substances the body needs. There should be very little homocysteine left in the bloodstream. If there are high levels of homocysteine in the blood, it may be a sign of a vitamin deficiency, heart disease, or homocystinuria, which is a rare inherited disorder.
      `;
    // medlineplus.gov
  }

  if (marker === 1052) {
    data = `Insulin is a hormone that helps move blood sugar, known as glucose, from your bloodstream into your cells.  At first, insulin resistance causes the body to make extra insulin, to make up for ineffective insulin. Extra insulin in the bloodstream can cause hypoglycemia. But insulin resistance tends to get worse over time. Eventually, it decreases your body's ability to make insulin. As insulin levels drop, blood sugar levels rise. 
      `;
    // medlineplus.gov
  }

  if (marker === 1082) {
    data = `Iron is an essential nutrient that helps form red blood cells. It is an important part of hemoglobin, the protein in RBCs that binds oxygen in the lungs and releases it as blood circulates to other parts of the body.  /*https://www.labcorp.com/help/patient-test-info/iron-tests*/
      `;
  }

  if (marker === 3006) {
    data = `Lactate dehydrogenase (LDH), also known as lactic acid dehydrogenase, is a type of protein, known as an enzyme.  LDH plays an important role in making the body's energy.  It is found in almost all the body's tissues, including those in the blood, heart, kidneys, brain, and lungs.  When these tissues are damaged, they release LDH into the bloodstream or other body fluids.  If LDH blood or fluid levels are high, it may mean certain tissues in the body have been damaged by disease or injury.
      `;
    // medlineplus.gov
  }

  if (marker === 1154) {
    data = `Luteinizing hormone (LH) is made by your pituitary gland, a small gland located underneath the brain. LH plays an important role in sexual development and functioning.

      In women, LH helps control the menstrual cycle. It also triggers the release of an egg from the ovary. This is known as ovulation. LH levels quickly rise just before ovulation.

      In men, LH causes the testicles to make testosterone, which is important for producing sperm. Normally, LH levels in men do not change very much.
      
      In children, LH levels are usually low in early childhood, and begin to rise a couple of years before the start of puberty. In girls, LH helps signal the ovaries to make estrogen. In boys, it helps signal the testes to make testosterone.
      `;
    // medlineplus.gov
  }

  if (marker === 1193) {
    data = `Magnesium is a type of electrolyte, which are electrically charged minerals.  The body needs magnesium to help your muscles, nerves, and heart work properly. Magnesium also helps control blood pressure and blood sugar.  Most of the body's magnesium is in the bones and cells.  A small amount is found in the blood. 
      `;
    // medlineplus.gov
  }

  if (marker === 1216) {
    data = `MCV (mean corpuscular volume) measures the average size of the red blood cells, also known as erythrocytes. Red blood cells move oxygen from the lungs to every cell in your body.
      `;
    // medlineplus.gov
  }

  if (marker === 1248) {
    data = `Methylmalonic acid (MMA) rises in B12 deficiency. /*self*/
      MMA will often become elevated in the early stages of vitamin B12 while serum vitamin B12 levels are in normal range. /*Labcorp*/
      MMA is often performed along with homocysteine.  /*Healthline*/
      `;
  }

  if (marker === 1280) {
    data = `MPV stands for mean platelet volume. Platelets are small blood cells that are essential for blood clotting, the process that helps stop bleeding after an injury. An MPV blood test measures the average size of platelets. MPV can help diagnose bleeding disorders and diseases of the bone marrow.
      `;
    // medlineplus.gov
  }

  if (marker === 1373) {
    data = `Osmolality measures the concentration of all chemical particles found in the fluid part of blood.
      `;
    // https://medlineplus.gov/ency/article/003463.htm
  }

  if (marker === 1406) {
    data = `Parathyroid Hormone (PTH), also known as parathormone, is made by your parathyroid glands. These are four pea-sized glands in your neck. PTH controls the level of calcium in the blood. Calcium is a mineral that keeps bones and teeth healthy and strong. It's also essential for the proper functioning of the nerves, muscles, and heart.  If calcium blood levels are too low, your parathyroid glands will release PTH into the blood. This causes calcium levels to rise. If calcium blood levels are too high, these glands will stop making PTH.
      `;
    // medlineplus.gov
  }

  if (marker === 1450) {
    data = `Phosphate is an electrically charged particle that contains the mineral phosphorus. /*https://medlineplus.gov/*/
      Calcium and phosphate in the body react in opposite ways: as blood calcium levels rise, phosphate levels fall. A hormone called parathyroid hormone (PTH) regulates the levels of calcium and phosphorus in the blood.  /*https://www.uofmhealth.org/health-library/hw202265 */
      `;
    // medlineplus.gov
  }

  if (marker === 1473) {
    data = `Platelets, also known as thrombocytes, are small blood cells that are essential for blood clotting. Clotting is the process that helps stop bleeding after an injury.  A platelet count test measures the number of platelets in the blood. A lower than normal platelet count is called thrombocytopenia. This condition can cause one to bleed too much after a cut or other injury that causes bleeding. A higher than normal platelet count is called thrombocytosis. This can make a blood clot more than is needed.  Blood clots can be dangerous because they can block blood flow.
      `;
    // medlineplus.gov
  }

  if (marker === 1483) {
    data = `Potassium is a type of electrolyte. Electrolytes are electrically charged minerals that help control muscle and nerve activity, maintain fluid levels, and perform other important functions. The body needs potassium to help the heart and muscles work properly. 
      `;
    // medlineplus.gov
  }

  if (marker === 1508 || marker === 1509) {
    data = `Progesterone is a hormone made by a woman's ovaries. Progesterone plays an important role in pregnancy. It helps make the uterus ready to support a fertilized egg. Progesterone also helps prepare the breasts for making milk.

      Progesterone levels vary during a woman's menstrual cycle. The levels start out low, then increase after the ovaries release an egg. If one becomes pregnant, progesterone levels will continue to rise as the body gets ready to support a developing baby. If one does not become pregnant (the egg is not fertilized), progesterone levels will go down and the period will begin.

      Progesterone levels in a pregnant woman are about 10 times higher than they are in a woman who is not pregnant. Men also make progesterone, but in much smaller amounts. In men, progesterone is made by the adrenal glands and testes.
      `;
    // medlineplus.gov
  }

  if (marker === 1570) {
    data = `Red cell distribution width (RDW) test is a measurement of the volume and size of the red blood cells.
      `;
    // medlineplus.gov
  }

  if (marker === 1589) {
    data = `Reticulocytes are red blood cells that are still developing. They are also known as immature red blood cells. Reticulocytes are made in the bone marrow and sent into the bloodstream. About two days after they form, they develop into mature red blood cells. These red blood cells move oxygen from your lungs to every cell in the body. /*medlineplus.gov/*/
    Reticulocytes are increased in acute and chronic hemorrhage, and hemolytic anemias.  /*Labcorp*/
      `;
    // https://www.labcorp.com/tests/001321/iron-and-total-iron-binding-capacity-tibc
  }

  if (marker === 1677) {
    data = `Sex hormone binding globulin is a protein made by the liver and attaches itself to sex hormones found in both men and women. SHBG controls how much of these hormones are delivered to the body's tissues. SHBG test is mostly used to look at testosterone. SHBG levels can show if there is too much or too little testosterone being used by the body.
      `;
    // medlineplus.gov
  }

  if (marker === 1695) {
    data = ` Sodium is a type of electrolyte. Electrolytes are electrically charged minerals that help maintain fluid levels and the balance of acids and bases. Sodium also helps the nerves and muscles work properly.  Once the body takes in enough sodium, the kidneys get rid of the rest in urine.
      `;
    // medlineplus.gov
  }

  if (marker === 1700) {
    data = `Soluble transferrin receptors are protensins in the blood.  /*Own*/
      Anemia of chronic disease and iron deficiency anemia, the most common forms of anemia, are differentiated primarily by estimates of iron status. Standard measures of iron status, such as ferritin, total iron-binding capacity, and serum iron are directly affected by chronic disease. In contrast, soluble transferrin receptor (sTfR) is elevated in iron deficiency but is not appreciably affected by chronic disease.  /*Labcorp*/
      `;
    // https://www.labcorp.com/tests/143305/soluble-transferrin-receptor
  }

  if (marker === 1081) {
    data = `Total iron-binding capacity (TIBC) measures the blood's ability to attach itself to iron and transport it around the body. /*https://www.nhs.uk/conditions/tibc-test/*/
      Used for the differential diagnosis of anemia.  /*Labcorp and me*/
      `;
    // https://www.labcorp.com/tests/001321/iron-and-total-iron-binding-capacity-tibc
  }

  if (marker === 1836) {
    data = `Transferrin is the main protein in the blood that binds to iron and transports it throughout the body.  /*MerckManuals*/
      Transferrin is responsible for 50% to 70% of the iron binding capacity of serum.  /*Labcorp*/
      Since other proteins may bind iron, transferrin is not the same as TIBC.  /*Labcorp*/
      Transferrin levels rise with iron deficiency and fall in cases of iron overload.  /*Labcorp*/
      Increased in iron deficiency anemia. It is decreased in chronic inflammatory states.  /*Labcorp*/
      Tranferrin is a more direct measurement than TIBC but a little more expensive.  /*My version of Dr Alan C and Dr CM*/
      `;
    // https://www.labcorp.com/tests/004937/transferrin
    // https://www.merckmanuals.com/-/media/Manual/LabTests/TransferrinandIronBindingCapacityTIBCUIBC.html
  }

  if (marker === 1853) {
    data = `Triglycerides are a type of fat in your body. If you eat more calories than you need, the extra calories are changed into triglycerides. These triglycerides are stored in your fat cells for later use. When your body needs energy, triglycerides are released into your bloodstream to provide fuel for your muscles to work.
      `;
    // medlineplus.gov
  }

  if (marker === 1862) {
    data = `TSH is made in a gland in the brain called the pituitary. When thyroid levels in your body are low, the pituitary gland makes more TSH. When thyroid levels are high, the pituitary gland makes less TSH.
      `;
    // medlineplus.gov
  }

  if (marker === 1885) {
    data = `Uric acid is a normal waste product that's made when the body breaks down chemicals called purines.  Most uric acid dissolves in your blood, goes to the kidneys, then leaves the body through your urine. If your body makes too much uric acid or doesn't release enough into your urine, it can make crystals that form in your joints. This condition is known as gout, a form of arthritis that causes painful inflammation in and around the joints.
      `;
    // medlineplus.gov
  }

  if (marker === 1950 || marker === 1963) {
    data = `White blood cells are part of the immune system. They help your body fight off infections and other diseases.  When you get sick, your body makes more white blood cells to fight the bacteria, viruses, or other foreign substances causing your illness. This increases your white blood count.
      `;
    // medlineplus.gov
  }

  if (marker === 936) { // Cholesterol HDL
    data = `High-density lipoproteins (HDL) collect fat molecules from the body's cells and take them back to the liver. HDLs are sometimes referred to as good lipoprotein because higher concentrations correlate with low rates of atherosclerosis progression.
      `;
    // Wikipedia
  }

  if (marker === 1132) { // Cholesterol LDL
    data = `Low-density lipoprotein (LDL) is one of the five major groups of lipoprotein which transport all fat molecules around the body.
      `;
    // Wikipedia
  }

  if (marker === 1327) { // Cholesterol Non HDL
    data = `Non HDL Cholesterol is total cholesterol minus HDL.
      `;
    // Wikipedia
  }

  if (marker === 505) { // Cholesterol Total
    data = `Cholesterol is biosynthesized by all animal cells and is an essential structural component of animal cell membranes. 
      `;
    // Wikipedia
  }

  if (marker === 1929) { // Cholesterol VLDL
    data = `Very-low-density lipoproteins (VLDL) carry newly synthesised triglycerides from the liver to adipose tissue.
      `;
    // Wikipedia
  }

  if (marker === 573) { // Copper
    data = `Serum copper increases under the influence of inflammatory conditions and estrogen.
    Serum copper is elevated in pregnancy, in patients on estrogens and estrogen-containing contraceptive drugs, in rheumatoid arthritis, and a number of other pathologic entities.
      `;
    // Labcorp
  }

  if (marker === 813) { // Folate Serum
    data = `Used to detect folate deficiency; monitor therapy with folate; evaluate megaloblastic and macrocytic anemia;
      `;
    // Labcorp
  }

  if (marker === 818) { // Free T4 Index (T7)  
    data = `Free T4 Index is a computation that estimates free T4 from T4 Total and T3 Uptake.
      `;
    // Labcorp
  }

  if (marker === 871) { // Glucose-6-Phosphate  
    data = `Glucose-6-phosphate dehydrogenase deficiency is a genetic disorder that occurs almost exclusively in males. This condition mainly affects red blood cells, which carry oxygen from the lungs to tissues throughout the body. In affected individuals, a defect in an enzyme called glucose-6-phosphate dehydrogenase causes red blood cells to break down prematurely. This destruction of red blood cells is called hemolysis.  The most common medical problem associated with glucose-6-phosphate dehydrogenase deficiency is hemolytic anemia, which occurs when red blood cells are destroyed faster than the body can replace them. 
      `;
    // https://medlineplus.gov/genetics/condition/glucose-6-phosphate-dehydrogenase-deficiency/
  }

  if (marker === 3002 || marker === 3005) { // Granulocytes
    data = `Granulocytes are a type of white blood cell that has small granules. These granules contain proteins. The specific types of granulocytes are neutrophils, eosinophils, and basophils.  Granulocytes, specifically neutrophils, help the body fight bacterial infections. The number of granulocytes in the body usually increases when there is a serious infection. People with a lower number of granulocytes are more likely to develop bad infections more often.
      `;
    // https://medlineplus.gov/ency/article/003440.htm
  }

  if (marker === 3003 || marker === 3004) { // Granulocytes Immature   
    data = `Immature granulocytes are white blood cells that have not fully developed before being released from the bone marrow into the blood.
      `;
  }

  if (marker === 120 || marker === 1187) { // Lymphocytes   
    data = `A lymphocyte is a type of white blood cell that is part of the immune system. There are two main types of lymphocytes: B cells and T cells. The B cells produce antibodies that are used to attack invading bacteria, viruses, and toxins. The T cells destroy the body's own cells that have themselves been taken over by viruses or become cancerous.
      `;
    // https://www.genome.gov/genetics-glossary/Lymphocyte
  }

  if (marker === 1214) { // MCH   
    data = `The mean corpuscular hemoglobin (MCH) is the average amount of hemoglobin per red blood cell.
      `;
    // https://www.genome.gov/genetics-glossary/Lymphocyte
  }

  if (marker === 1215) { // MCHC   
    data = `The mean corpuscular hemoglobin concentration (MCHC) is the average concentration of hemoglobin in red blood cells.
      `;
  }

  if (marker === 122 || marker === 1269) { // Monocytes   
    data = `Monocytes are a type of white blood cell. They help fight bacteria, viruses, and other infections.
      `;
  }

  if (marker === 124 || marker === 1318) { // Neutrophils   
    data = `Neutrophils are the most abundant type of granulocytes and make up 40% to 70% of all white blood cells in humans.
      `;
    // Wikipedia
  }

  if (marker === 126) { // Nucleated RBC   
    data = `A nucleated red blood cell (NRBC) is a red blood cell that contains a cell nucleus. RBCs normally contain a nucleus only during the very early stages of the cell's life. If NRBCs are identified on an adult's complete blood count, it suggests that there is a very high demand for the bone marrow to produce RBCs, and immature RBCs are being released into circulation.
      `;
    // Wikipedia
  }

  return data;
};
