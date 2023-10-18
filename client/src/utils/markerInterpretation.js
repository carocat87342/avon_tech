/* eslint-disable */

export const getMarkerInterpretation = (marker) => {
  const data = {
    high: [],
    low: []
  };

  // Glucose
  if (marker === 866) {
    data.high = [
      {
        condition: "Insulin resistance",
        prevalence: "Common in the general population",
        comment: `Insulin is released by the pancreas in response to carbohydrates consumed in the diet. In states of insulin resistance, the same amount of insulin does not have the same effect on glucose transport and blood sugar levels, and the pancreas makes extra insulin to make up for it. For a while, this will work and the blood sugar levels will stay normal. Over time, though, the pancreas won't be able to keep up and the blood sugar levels will go up.
        <br />
        https://doi.org/10.1111/j.1749-6632.2002.tb04262.x
        https://www.ncbi.nlm.nih.gov/books/NBK507839/
        https://doi.org/10.1038/s41598-019-42700-1
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperthyroidism",
        prevalence: "Common in the general population",
        comment: `The elevated plasma glucose levels in hyperthyroidism may be explained by increased rates of endogenous glucose production, due mainly to increased gluconeogenesis.
        <br />
        https://doi.org/10.1210/jcem-63-1-62
        https://doi.org/10.1155/2013/390534
        https://doi.org/10.4061/2011/439463
        `,
        evidence: "Strong"
      },
      {
        condition: "Chronic kidney disease",
        prevalence: "Common in the general population",
        comment: `The accumulation of uremic toxins and increased parathyroid hormone levels in patients with chronic renal failure (CRF) cause insulin resistance in tissues, particularly skeletal muscle tissues.
        <br />
        https://doi.org/10.4103/1735-1995.172845
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2532962/
        `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatic dysfunction",
        prevalence: "Common in patients with diabetes",
        comment: `Exocrine pancreatic insufficiency (EPI) is a condition caused by reduced or inappropriate secretion or activity of pancreatic juice and its digestive enzymes, pancreatic lipase in particular. EPI and diabetes can go hand in hand. Often, the damage from chronic pancreatitis that causes EPI also affects the pancreas cells that make insulin, which leads to diabetes. But some recent studies suggest that EPI itself can cause diabetes.
        <br />
        https://doi.org/10.2337/dc08-s244
        https://doi.org/10.1155/2015/595649
        https://doi.org/10.1007/s11892-020-01304-0
        https://doi.org/10.1155/2011/761950
        `,
        evidence: "Strong"
      },
      {
        condition: "Acute stress (response to trauma, heart attack, and stroke for instance)",
        prevalence: "Common in people who have experienced a recent traumatic life event",
        comment: `The neuroendocrine response to stress is characterized by excessive gluconeogenesis, glycogenolysis and insulin resistance. Stress hyperglycemia, however, appears to be caused predominantly by increased hepatic output of glucose rather than impaired tissue glucose extraction.
        <br />
        https://doi.org/10.1016/s0749-0704(05)70154-8
        https://doi.org/10.1038/s41598-020-58679-z
        https://doi.org/10.1186/cc12514
        `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatitis",
        prevalence: "Rare in the general population",
        comment: `High blood sugar (Hyperglycemia) during acute pancreatitis (AP) can be due to abnormalities in insulin secretion, increase in counterregulatory hormones release, or decrease in glucose utilization by peripheral tissues.
        <br />
        https://doi.org/10.1016/j.jpeds.2010.09.066
        https://doi.org/10.1016/j.sjbs.2018.11.012
        https://pubmed.ncbi.nlm.nih.gov/12653076/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperadrenal function/ Cushing syndrome",
        prevalence: "Rare in the general population",
        comment: `Cushing’s disease is a severe clinical condition caused by a pituitary adenoma hypersecreting adrenocorticotropic hormone (ACTH). The persistently high levels of ACTH lead to chronic hypersecretion of cortisol by the adrenal glands, which negatively affects many tissues and organs in the body. Chronic hypercortisolism blocks or impedes the action of insulin on peripheral tissues, such as liver, muscle and adipose tissue, leading to increased insulin resistance, and it partially inhibits insulin release by the pancreatic beta-cells.
        <br />
        https://doi.org/10.1007/s11102-013-0483-3
        https://doi.org/10.3389/fendo.2018.00284
        https://doi.org/10.1159/000314319
        `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatic cancer",
        prevalence: "Rare in the general population",
        comment: `Pancreatic cancers cause diabetes (high blood sugar) because they destroy the insulin-making cells.
        <br />
        https://doi.org/10.1136/bmj.g7371
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4226830/
        `,
        evidence: "Strong"
      },
      {
        condition: "Acromegaly",
        prevalence: "Rare in the general population",
        comment: `Acromegaly is a disease caused by a chronic excess of growth hormone (GH) and consequently by increased circulating insulin-like growth factor 1 (IGF-1). Excess GH stimulates gluconeogenesis and lipolysis, causing hyperglycemia and elevated free fatty acid levels.
        <br />
        https://doi.org/10.1007/s11892-017-0838-7
        https://doi.org/10.3389/fendo.2018.00358
        https://doi.org/10.3389/fendo.2019.00509
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Hypothyroidism",
        prevalance: "Common in general population",
        comment: `Hypothyroidism is linked with various hormonal biochemical and nervous system abnormalities, which may contribute to hypoglycemia.
        <br />
        https://doi.org/10.4103/2230-8210.126517
        https://www.thetrp.net/text.asp?2017/14/3/127/216212
       `,
        evidence: "Strong"
      },
      {
        condition: "Drinking excessive alcohol",
        prevalance: "Common in the general population",
        comment: `Excessive alcohol consumption causes an increase in insulin secretion, which leads to low blood sugar.
        <br />
        https://doi.org/10.1016/j.jemermed.2012.11.099
        https://doi.org/10.1111/bcpt.12957
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3968474/
        https://doi.org/10.2337/diab.14.6.350        
       `,
        evidence: "Strong"
      },
      {
        condition: "Helicobacter Pylori infection",
        prevalance: "Common in the general population",
        comment: `A link between Helicobacter Pylori infection, serum gastrin, insulin concentrations, and serum glucose concentrations has been demonstrated in a small group of dyspeptic patients. Because of the effect of gastrin on insulin release and glucose absorption, infected healthy individuals may have lower postprandial and fasting plasma glucose concentrations than non-infected people. Helicobacter pylori-induced gastritis may also contribute to occurrence of postprandial symptomatic hypoglycemia
        <br />
        https://doi.org/10.1023/a:1018842606388    
       `,
        evidence: "Strong"
      },
      {
        condition: "Severe liver disease",
        prevalance: "Common in the general population",
        comment: `The liver is key to glucose homeostasis. Any disruption of its metabolism, structural integrity, or intracellular dynamics may alter the liver's ability to maintain normal glucose homeostasis. When such disruption affects hepatic glucose output, hypoglycemia may eventuate.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/2645130/#:~:text=The%20liver%20is%20key%20to,glucose%20output%2C%20hypoglycemia%20may%20eventuate.
        https://doi.org/10.1530/EDM-17-0155 
       `,
        evidence: "Strong"
      },
      {
        condition: "Severe heart failure",
        prevalance: "Common in the general population",
        comment: `Spontaneous hypoglycemia associated with congestive heart failure is attributed to hyperinsulinism.
        <br />
        Https://www.longdom.org/open-access/persistent-hypoglycemia-revealing-severe-heart-failure-2167-7182-1000303.pdf
        https://doi.org/10.1161/01.CIR.40.2.209
        https://doi.org/10.2337/db13-1454
        https://doi.org/10.4158/EP.4.2.94
       `,
        evidence: "Strong"
      },
      {
        condition: "Chronic kidney (renal) failure",
        prevalance: "Common in the general population",
        comment: `Since insulin is renally cleared, degradation of insulin in peripheral tissues is decreased in patients with chronic kidney disease. Patients with chronic kidney disease and uremia may also become anorexic with suboptimal nutrition, leading to reduction in glycogen stores. Moreover, with a decline in renal mass, patients with chronic kidney disease may experience reduced renal gluconeogenesis. The confluence of these factors may contribute to a greater risk for hypoglycemia among patients with chronic kidney disease and may be an unintended consequence of therapy to treat hyperglycemia.
        <br />
        https://doi.org/10.2215/CJN.00800209
        https://pubmed.ncbi.nlm.nih.gov/2645122/
        https://doi.org/10.1016/j.mayocp.2014.07.013
       `,
        evidence: "Strong"
      },
      {
        condition: "Severe infections",
        prevalance: "Common in the general population",
        comment: `The mechanism(s) for hypoglycemia with sepsis is not well defined. Depleted glycogen stores, impaired gluconeogenesis and increased peripheral glucose utilization may all be contributing factors.
        <br />
        https://doi.org/10.2215/CJN.00800209
        https://pubmed.ncbi.nlm.nih.gov/2645122/
        https://doi.org/10.1016/j.mayocp.2014.07.013
       `,
        evidence: "Strong"
      },
      {
        condition: "Anorexia (Starvation)",
        prevalance: "Common in the general population",
        comment: `Dietary restriction accompanied by weight loss and excessive exercise lead to depletion of hepatic glycogen stores and disruption of hepatic gluconeogenesis, resulting in abnormalities of glucose metabolism and hypoglycemia. In milder cases of anorexia, hypoglycemia is not generally present. In contrast, individuals with advanced anorexia nervosa develop hypoglycemia.
        <br />
        https://doi.org/10.1016/j.nut.2014.01.007
        https://doi.org/10.1186/s40337-015-0040-8
        https://doi.org/10.1002/eat.20889
        https://doi.org/10.1530/EJE-18-0596
       `,
        evidence: "Strong"
      },
      {
        condition: "Insulin overdose",
        prevalance: "Common in patients with diabetes",
        comment: `Excess insulin in the bloodstream causes cells to absorb too much glucose (sugar) from the blood. It also causes the liver to release less glucose. These two effects together create dangerously low glucose levels in the blood.
        <br />
        https://doi.org/10.1016/j.jemermed.2012.11.099
        https://doi.org/10.1111/bcpt.12957
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3968474/
       `,
        evidence: "Strong"
      },
      {
        condition: "Adrenal insufficiency (Addison's disease)",
        prevalance: "Rare in the general population",
        comment: `Cortisol is a catabolic hormone influencing carbohydrate, lipid, and protein metabolism. Depleted cortisol increases insulin sensitivity in patients with adrenal insufficiency and is thought to involve hypoglycemia. The hypoglycemia related to adrenal insufficiency is thought to be more common in neonates and children than in adults.
        <br />
        https://doi.org/10.2147/TCRM.S238435
        https://doi.org/10.1530/acta.0.112s275
        https://www.ncbi.nlm.nih.gov/books/NBK441832/
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypopituitarism",
        prevalance: "Rare in the general population",
        comment: `Insufficient Adrenocorticotropic hormone (ACTH) secretion by pituitary glands results in cortisol deficiency; therefore, hypopituitarism may cause hypoglycemic events in diabetic patients.
        <br />
        https://doi.org/10.1097/MD.0000000000016407
        https://doi.org/10.1055/s-2007-967092
        https://doi.org/10.1186/s40064-015-0934-6
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B6 deficiency",
        prevalance: "Rare in the general population",
        comment: `Epidemiological and experimental studies indicated an evident inverse association between vitamin B6 levels and blood sugar, as well as a clear protective effect of vitamin B6 on diabetic complications.
        <br />
        https://doi.org/10.3390/ijms21103669
       `,
        evidence: "Weak"
      },
      {
        condition: "Carnitine deficiency",
        prevalance: "Rare in the general population",
        comment: `Carnitine plays an important role in the transfer of long-chain fatty acids across the inner mitochondrial membrane. Long-chain fatty acids are required for energy production during the fasting state. Patients with carnitine deficiency may present with hypoketotic hypoglycemia (low levels of ketones (products of fat breakdown that are used for energy) and low blood sugar (hypoglycemia) and other symptoms.
        <br />
        https://doi.org/10.6065/apem.2016.21.4.226
        https://doi.org/10.1186/1750-1172-7-68
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin C deficiency",
        prevalance: "Rare in the general population",
        comment: `There is no evidence to support the claim. Contrary, there is evidence that supplementation of Vitamin C reduces blood glucose by improving insulin sensitivity.
        <br />
        https://doi.org/10.1155/2011/195271
       `,
        evidence: "Weak"
      },
      {
        condition: "High‐dose of vitamin C",
        prevalance: "Rare in the general population",
        comment: `It is believed that doses of vitamin C in diabetics or patients with vitamin C deficiency will improve insulin sensitivity and function of endothelium.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/18160753/
        https://doi.org/10.2337/diacare.23.6.726
        https://doi.org/10.1155/2011/195271
       `,
        evidence: "Strong"
      },
      {
        condition: "Biotin deficiency",
        prevalance: "Rare in the general population",
        comment: `Blood glucose level, which is under homeostatic control, is known to be regulated by dietary and hormonal factors. In fasting, blood glucose level is maintained by gluconeogenesis. Pyruvate carboxylase, a key enzyme in the gluconeogenic pathway, is a biotin-dependent enzyme, and thus biotin plays a direct role in gluconeogenesis.
        <br />
        https://doi.org/10.1016/0024-3205(69)90134-9
        https://doi.org/10.1017/S0007114512004850
        https://doi.org/10.1039/c2fo10175k
       `,
        evidence: "Strong"
      },
      {
        condition: "Tumors that produce insulin (insulinomas)",
        prevalance: "Rare in the general population",
        comment: `Hyperinsulinemia causes increased glycogen synthesis, decreased gluconeogenesis, and glycogenolysis, all of which contribute to hypoglycemia.
        <br />
        https://doi.org/10.3748/wjg.v19.i6.829
        https://www.ncbi.nlm.nih.gov/books/NBK544299/
        https://doi.org/10.1002/ccr3.927
       `,
        evidence: "Strong"
      },
      {
        condition: "Deliberate use of glucose-lowering products",
        prevalance: "",
        comment: `Too much insulin or other diabetes medications may cause the blood sugar level to drop too low, causing hypoglycemia.
        <br />
        https://doi.org/10.1177/2042018811401644
        https://doi.org/10.4103/2230-8210.117219
        https://doi.org/10.1016/s0889-8529(05)70088-8
       `,
        evidence: "Strong"
      }
    ];
  }

  // Lactate Dehydrogenase (LD or LDH)
  if (marker === 3006) {
    data.high = [
      {
        condition: "Hypothyroidism",
        prevalence: "Common in the general population",
        comment: `Elevated levels of LDH enzymes is an indicator of cellular necrosis and tissue damage in hypothyroidism, which releases LDH, since there is significant involvement of skeletal muscle.
        <br />
        https://doi.org/10.4103/1119-3077.91755
        https://doi.org/10.1111/j.1532-5415.1977.tb00299.x
        https://www.ijcbr.in/article-details/4186
        `,
        evidence: "Strong"
      },
      {
        condition: "Acute Kidney disease",
        prevalence: "Common in the general population",
        comment: `A steady increase of total LDH, LDH-5 and LDH-1 is due to complement-mediated leukocyte activation and pulmonary leukostasis.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/2373551/
        https://doi.org/10.1111/j.0954-6820.1968.tb02430.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver diseases (cirrhosis, certain types of hepatitis)",
        prevalence: "Common in the general population",
        comment: `Production of serum lactate dehydrogenase (LDH) increases in the liver under hypoxic conditions. Hypoxia is a condition in which the body or a region of the body is deprived of adequate oxygen supply at the tissue level.
        <br />
        https://doi.org/10.3892/etm.2011.197
        https://doi.org/10.1186/1476-5926-7-6
        `,
        evidence: "Strong"
      },
      {
        condition: "Infections such as infectious mononucleosis (mono), meningitis, encephalitis, HIV",
        prevalence: "Common in the general population",
        comment: `Lactate dehydrogenase (LD) is most active in the liver, striated muscles, heart, kidneys, lungs, brain, and red blood cells (erythrocytes). In the case of cell damage, lactate dehydrogenase is released from inside them, its concentration and activity in the blood increase.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/8354546/
        https://doi.org/10.1007/s12639-014-0494-7
        https://doi.org/10.18632/aging.103372
        `,
        evidence: "Strong"
      },
      {
        condition: "Bone fractures",
        prevalence: "Common in the general population",
        comment: `In the case of fractures, cell damage releases dehydrogenase resulting in increased concentration and activity in the blood.
        <br />
        https://doi.org/10.1038/s41598-018-36982-0
        https://doi.org/10.3109/17453677108989021
        `,
        evidence: "Strong"
      },
      {
        condition: "Skeletal muscular damage, including intense exercise",
        prevalence: "Common in the general population",
        comment: `Upon tissue damage, the cells release LDH in the bloodstream. Depending upon the type of tissue injury, the enzyme can remain elevated for up to 7 days in the bloodstream. Also in sports medicine, LDH potentially indicates muscle response to training, with an increase in skeletal and cardiac muscles after 3-5 hours of training.
        <br />
        https://doi.org/10.1515/hukin-2017-0071
        https://www.ncbi.nlm.nih.gov/books/NBK557536/
        `,
        evidence: "Strong"
      },
      {
        condition: "Severe shock, sepsis",
        prevalence: "Common in the general population",
        comment: `Increased plasma LDH levels are commonly seen in patients with severe sepsis. It is a marker of cell injury which reflects the degree of tissue damage.
        <br />
        https://doi.org/10.1016/j.ajem.2016.06.012
        https://doi.org/10.1378/chest.126.4_MeetingAbstracts.873S
        `,
        evidence: "Strong"
      },
      {
        condition: "Testicular cancer, lymphoma or other cancers (Malignancies)",
        prevalence: "Common in the general population",
        comment: `In malignancy, the growth of tumor cells consumes oxygen more than the supply; thus, hypoxia is quite common. The growing tumors undergo LDH mediated energy production to fulfill the demand of fast cellular growth. Hence, LDH is an established marker of metastases.
        <br />
        https://doi.org/10.1007/978-94-017-7215-0_8
        https://doi.org/10.1002/cam4.1820
        https://doi.org/10.1371/journal.pone.0166482
        `,
        evidence: "Strong"
      },
      {
        condition: "Certain types of anemia: hemolytic, pernicious (megaloblastic anemia)",
        prevalence: "Rare in the general population",
        comment: `Lactate Dehydrogenase is present in red cells and hemolysis causes release into the plasma.
        <br />
        https://doi.org/10.1182/blood-2005-06-2373
        https://doi.org/10.1155/2015/635670
        `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatitis",
        prevalence: "Rare in the general population",
        comment: `Lactate dehydrogenase enzymes are generally elevated early in the course of the disease because of acute inflammatory cell injury.
        <br />
        https://doi.org/10.1016/j.jcrc.2017.05.001
        https://doi.org/10.1111/j.1572-0241.1998.00363.x
        https://doi.org/10.1002/14651858.CD012645
        `,
        evidence: "Strong"
      },
      {
        condition: "Intestinal, myocardial (heart) and lung (pulmonary) infarction",
        prevalence: "",
        comment: `Cell damage releases lactate dehydrogenase from inside them resulting in increased concentration and activity in the blood.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/3415440/
        https://www.ncbi.nlm.nih.gov/books/NBK545216/
        https://doi.org/10.1136/bmj.2.5209.1361
        `,
        evidence: "Strong"
      },
      {
        condition: "Lack of oxygen (hypoxia)",
        prevalence: "",
        comment: `Hypoxic conditions stimulate lactate dehydrogenase (LDH) activity in muscle cells.
        <br />
        https://doi.org/10.1007/BF00374315
        https://doi.org/10.1016/j.expneurol.2015.04.025
        https://doi.org/10.1080/009841096160808
        `,
        evidence: "Strong"
      },
      {
        condition: "Poor response to chemotherapy. ",
        prevalence: "",
        comment: `Metabolic changes in rapidly dividing cancer cells are closely associated with increased uptake of glucose and abnormal activity of lactate dehydrogenase (LDH), which regulates the processing of glucose to lactic acid. As serum LDH levels have been found to be commonly increased in cancer patients and correlated with poor clinical outcome and resistance to therapy, the determination of LDH has become a standard supportive tool in diagnosing cancers or monitoring the effects of cancer treatment.
        <br />
        https://doi.org/10.3889/oamjms.2019.470
        https://doi.org/10.1186/s11658-020-00228-7
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Diabetes",
        prevalance: "Common in general population",
        comment: `Some studies show that LDH 5 percentage is significantly decreased in diabetics.
        <br />
        https://doi.org/10.4314/ahs.v18i3.28
       `,
        evidence: "Moderate"
      },
      {
        condition: "Hypoglycemia",
        prevalance: "Common in people with diabetes",
        comment: `There is no evidence that decreased levels of Lactate Dehydrogenase is associated with hypoglycemia.
       `,
        evidence: "Weak"
      },
      {
        condition: "Ketosis",
        prevalance: "Common in people with type 1 diabetes. People with type 2 diabetes may also develop",
        comment: `There is no evidence that decreased levels of Lactate Dehydrogenase is associated with ketosis.
        `,
        evidence: "Weak"
      },
      {
        condition: "Ascorbic acid (vitamin C) toxicity",
        prevalance: "Rare in the general population.",
        comment: `There is evidence that the percentages of the LDH-4 and LDH-5 fractions are negatively affected by long-term vitamin C loading.
        <br/>
        https://doi.org/10.1265/jjh.43.736
        `,
        evidence: "Strong"
      }
    ];
  }

  // Blood Lipids
  if (marker === 505) {
    data.high = [
      {
        condition: "Elevated insulin",
        Prevalence: "Common in the general population",
        comment: `Insulin resistance is associated with increased cholesterol synthesis and decreased cholesterol absorption.
        <br/>
        https://doi.org/10.1016/j.atherosclerosis.2010.02.029
        https://doi.org/10.1194/jlr.P006619
        https://doi.org/10.1210/jcem.75.6.1464641
        `,
        evidence: "Strong"
      },
      {
        condition: "Cardiovascular Disease risk",
        Prevalence: "Common in the general population",
        comment: `Too much cholesterol in blood builds up in the walls of the arteries. Increased cholesterol levels are associated with elevated cardiovascular disease risk, while decreased cholesterol levels are associated with reduced cardiovascular risk.
        <br/>
        https://doi.org/10.1161/JAHA.118.008819
        https://doi.org/10.1016/j.atherosclerosis.2016.03.016
        `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        Prevalence: "Common in the general population",
        comment: `Hypercholesterolemia in hypothyroidism is mainly due to a reduction in low-density lipoprotein (LDL) receptor activity, this accompanied by concomitant diminishing control by triiodothyronine (T3) of sterol regulatory element-binding protein 2 (SREBP-2), which modulates cholesterol biosynthesis by regulating rate-limit.
        <br/>
        https://doi.org/10.3389/fendo.2018.00511
        https://doi.org/10.1530/eje.1.02333
        https://doi.org/10.2174/1874192401105010076
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3687877
        `,
        evidence: "Strong"
      },
      {
        condition: "Genetics",
        Prevalence: "Common in the general population",
        comment: `For some people, high cholesterol is genetic. Familial hypercholesterolaemia is an inherited condition characterized by higher than normal levels of blood cholesterol. Familial hypercholesterolaemia is due to a mutation of the low density lipoprotein receptor (LDLR) gene that changes the way the receptors develop, either in number or structure. This means that low-density lipoprotein cholesterol is not well absorbed into cells, and remains circulating in the blood.
        <br/>
        https://www.ncbi.nlm.nih.gov/books/NBK395584/
        https://www.ncbi.nlm.nih.gov/books/NBK174884/
        https://doi.org/10.1136/jmg.2006.038356
        `,
        evidence: "Strong"
      },
      {
        condition: "Cholestasis",
        Prevalence: "Common in pregnant women",
        comment: `Serum cholesterol is elevated in cholestasis because its metabolic degradation and excretion are impaired. Bile is the normal excretory pathway for cholesterol, and with reduced bile formation, cholesterol is retained.
        <br/>
        https://doi.org/10.1007/s11938-001-0022-6
        https://doi.org/10.4254/wjh.v8.i22.924
        https://doi.org/10.1371/journal.pone.0210316
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Hyperthyroidism",
        Prevalence: "Common in the general population",
        comment: `Thyroid disorders are known to affect lipid metabolism hence thyroid dysfunction may result in changes in the composition and transport of lipoproteins. Both overt and subclinical hyperthyroidism is associated with reduced serum levels of total cholesterol (TC), low density lipoprotein (LDL) and high density lipoprotein (HDL). Hyperthyroidism can also be the underlying cause of unexplained improvement of hyperlipidemia.
        <br />
        https://doi.org/10.14310/horm.2002.1170
        https://pubmed.ncbi.nlm.nih.gov/17018450/
        `,
        evidence: "Strong"
      },
      {
        condition: "Illness, infection, or inflammation",
        Prevalence: "Common in the general population",
        comment: `Total cholesterol levels drop at the onset of acute illness and return to normal during recovery. Multiple mechanisms influence hypocholesterolemia in critically ill patients and these include: downregulation of hepatic synthesis, probably due to decreased production of cholesterol precursors particularly lanosterol and lathosterol, loss of apoproteins in burns, and increased cholesterol catabolism. Chronic inflammation also can produce hypocholesterolemia due to the chronic effect of proinflammatory cytokines on lipoprotein metabolism.
        <br />
        https://doi.org/10.1016/j.ccc.2005.08.008
        https://doi.org/10.1016/j.clinbiochem.2006.10.015
        https://doi.org/10.1093/gerona/50a.3.m137
        https://pubmed.ncbi.nlm.nih.gov/21844573/
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver dysfunction",
        Prevalence: "Common in the general population",
        comment: `Because hepatocytes are the most active site of lipid metabolism, there is a prominent decline in plasma cholesterol and triglyceride (TG) levels in patients with severe hepatitis and hepatic failure because of reduction of lipoprotein biosynthesis. For reduced liver biosynthesis capacity, low levels of TG and cholesterol is usually observed in chronic liver diseases.
        <br />
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3271321/
        https://doi.org/10.1080/00365529850172593
        https://doi.org/10.4103/0300-1652.108886
        `,
        evidence: "Strong"
      },
      {
        condition: "Megaloblastic and sideroblastic anemia",
        Prevalence: "Rare in the general population",
        comment: `The exact mechanism of hypocholesterolemia in anemic patients is not known. Nevertheless, several studies postulate different mechanisms, with some authors even suggesting that hypocholesterolemia might be the cause rather than the consequence of anemia which is explained by the fact that cholesterol deficiency leads to rigidity of the erythrocytes.
        <br />
        https://doi.org/10.1111/j.0954-6820.1982.tb01953.x
        https://doi.org/10.4176/071221
        `,
        evidence: "Strong"
      },
      {
        condition: "Manganese deficiency",
        Prevalence: "Rare in the general population",
        comment: `While a small body of literature indicates that Manganese deficiency is associated Moderate with cases of hypocholesterolemia, other studies either show no relationship between manganese deficiency and hypocholesterolemia, or even suggest that Manganese deficiency may be associated with cases of hypercholesterolemia.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK222332/?report=classic
        https://pubmed.ncbi.nlm.nih.gov/10385885/
        `,
        evidence: "Strong"
      },
      {
        condition: "Malabsorption and/or malnutrition",
        Prevalence: "",
        comment: `Since dietary fats constitute the exogenous source of body lipids, undernutrition or fat malabsorption, such as in celiac disease, can lead to hypolipidemia.
        <br />
        https://doi.org/10.1017/S0007114509297248
        https://doi.org/10.3390/nu9080829
        https://www.sciencedirect.com/science/article/abs/pii/S000282239500436X
        https://doi.org/10.1016/s0899-9007(99)00251-8
        `,
        evidence: "Strong"
      }
    ];
  }

  // Blood Lipids
  if (marker === 936) {
    data.high = [
      {
        condition: "An increased risk of heart attack",
        Prevalence: "Common in the general population",
        comment: `There is evidence that coronary heart disease risks are associated with very high levels of HDL cholesterol.
        <br />
        https://doi.org/10.21037/jtd.2017.12.97
        https://doi.org/10.1161/JAHA.113.000519
        `,
        evidence: "Strong"
      },
      {
        condition: "Inflammation",
        Prevalence: "Common in the general population",
        comment: `There is no evidence that inflammation causes elevated levels of HDL cholesterol. Contrary, there is evidence that elevated levels of HDL Cholesterol cause a decrease in serum HDL.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK326741/
        `,
        evidence: "Weak"
      },
      {
        condition: "Liver disease",
        Prevalence: "Common in the general population",
        comment: `Several studies show that HDL-C levels significantly decrease with the deterioration of the liver.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/15765449/
        https://link.springer.com/article/10.1007/s10238-013-0262-5
        `,
        evidence: "Weak"
      },
      {
        condition: "Intestinal permeability and/or endotoxemia",
        Prevalence: "",
        comment: `Increased intestinal paracellular permeability could disrupt cholesterol homoeostasis by interfering with the feedback suppression of dietary and biliary cholesterol absorption in the gut, which normally serves as a mechanism to prevent an oversupply of cholesterol for lipoprotein synthesis.
        <br />
        https://doi.org/10.1016/j.numecd.2018.07.006
        https://doi.org/10.1016/j.metabol.2016.12.015
        `,
        evidence: "Strong"
      },
      {
        condition: "High intensity exercise",
        Prevalence: "",
        comment: `Exercise affects blood cholesterol and other lipids positively by regulating the metabolism of all lipids in the blood.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/7109888/
        https://doi.org/10.1097/00005768-200106001-00021
        https://doi.org/10.1097/MOL.0000000000000568
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Insulin resistance",
        prevalance: "Common in the general population",
        comment: `Insulin resistance decreases circulating HDL levels by interfering with HDL particle assembly.
        <br />
        https://doi.org/10.1016/s0009-9120(03)00078-x
        https://doi.org/10.1016/j.atherosclerosis.2011.02.021
        https://doi.org/10.2337/diab.43.3.411
       `,
        evidence: "Strong"
      },
      {
        condition: "Cholestasis",
        prevalance: "Common in pregnant women",
        comment: `There is no evidence that decreased levels of HDL Cholesterol is associated with Cholestasis. Instead, available evidence indicates that hyperlipidemia with a marked increase of high- density lipoprotein (HDL) cholesterol levels is a common feature in patients with chronic cholestatic liver disease.
        <br />
        https://doi.org/10.1007/s11938-001-0022-6
       `,
        evidence: "Very weak"
      },
    ];
  }

  // Blood Lipids
  if (marker === 853) {
    data.high = [
      {
        condition: "Insulin resistance",
        prevalance: "Common in the general population",
        comment: `A common cause of high triglycerides is excess carbohydrates in the diet. High triglycerides signal insulin resistance; that's when the body has excess insulin and blood sugar is not responding in normal ways to insulin. This results in higher than normal blood sugar levels.
        <br />
        https://doi.org/10.1080/22423982.2017.1310444
        https://doi.org/10.1016/j.arcmed.2005.01.005
        https://doi.org/10.2147/CLEP.S31830
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `Thyroid hormones play a pivotal role in the regulation of lipid metabolism. They directly regulate hepatic lipid metabolism including de novo lipogenesis, triglyceride (TG) assembly, lipolysis, fatty acid oxidation, and biosynthesis and clearance of cholesterol.
        <br />
        https://doi.org/10.1159/000351249
        https://doi.org/10.1530/eje.1.02333
        https://doi.org/10.1007/s11886-004-0054-3
       `,
        evidence: "Strong"
      },
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Alcohol increases the synthesis of large very low density lipoprotein (VLDL) particles in the liver, which is the main source of triglycerides in the hypertriglyceridemia associated with chronic excessive alcohol intake.
        <br />
        https://doi.org/10.1097/MOL.0b013e3283606845
        https://doi.org/10.1155/2012/862504
        https://doi.org/10.1093/alcalc/agq088
       `,
        evidence: "Strong"
      },
      {
        condition: "Risk of developing pancreatitis",
        prevalance: "Rare in the general population",
        comment: `Both hypertriglyceridemia (HTG) (by causing an excess of free fatty acids (FFAs)) and elevated chylomicrons are thought to increase plasma viscosity, which may induce ischemia in pancreatic tissue and trigger organ inflammation.
        <br />
        https://doi.org/10.4103/2230-8210.91211
        https://doi.org/10.1177/2050640618755002
       `,
        evidence: "Strong"
      },
      {
        condition: "Elevated estrogen",
        prevalance: "",
        comment: `Estrogen increases triglyceride by promoting synthesis of triglyceride in the liver and secreting this lipid into the circulation as Very Low Density Lipoprotein (VLDL).
        <br />
        https://doi.org/10.1016/j.jacl.2007.11.001
        https://doi.org/10.1016/s0026-0495(03)00276-2
        https://doi.org/10.1055/s-2007-979089
       `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Autoimmune conditions",
        prevalance: "Common in the general population",
        comment: `Several tissues (adipose tissue, muscle, and lung) are rich in lipoprotein lipase (LPL) and are the source of postheparin lipase activity, thus contributing to clear serum triglyceride level and to take up free fatty acid (FFA) from circulating very low-density lipoprotein (VLDL) triglyceride (TG). It is believed that, in autoimmune diseases, an increased content and/or release of LPL by these tissues might lower serum TG concentration and increase free fatty acid level.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/14600656/
       `,
        evidence: "Strong"
      },
      {
        condition: "Low fat diet",
        prevalance: "",
        comment: `While some studies seem to suggest that a low fat diet has no significant effect on serum triglycerides, there is evidence from a few studies that a low-fat diet may lower serum triglyceride levels in some subjects.
        <br />
        https://doi.org/10.1093/jn/134.6.1400
        https://doi.org/10.1093/jn/134.4.880
        https://doi.org/10.1080/07315724.2004.10719359
       `,
        evidence: "Moderate"
      },
      {
        condition: "Dysfunctional absorption",
        prevalance: "",
        comment: `Fat malabsorption can lead to low serum levels of triglycerides, cholesterol, and alpha- and beta-carotene. This is because the small intestine plays a key role in lipid metabolism by absorbing fat and synthesizing apoproteins. Fat malabsorption secondary to intestinal disease results in abnormalities of lipoprotein concentration and composition and can lead to deficiency of essential fatty acids and fat-soluble vitamins.
        <br />
        https://doi.org/10.1016/B978-0-12-386456-7.03804-1
        https://doi.org/10.1136/gut.30.spec_no.29
       `,
        evidence: "Strong"
      },
    ];
  }

  // Magnesium
  if (marker === 1193) {
    data.high = [
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `Hypothyroidism increases tubular magnesium (Mg) reabsorption.
        <br />
        https://doi.org/10.1038/s41598-018-28362-5
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1855626/
        https://doi.org/10.1155/2018/9041694
       `,
        evidence: "Strong"
      },
      {
        condition: "End-stage renal disease (ESRD)/ Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `In moderate chronic kidney disease (CKD), increases in the fractional excretion of magnesium largely compensate for the loss of glomerular filtration rate to maintain normal serum magnesium levels. However, in more advanced CKD (as creatinine clearance falls <30 mL/min), this compensatory mechanism becomes inadequate such that overt hypermagnesaemia develops frequently in patients with creatinine clearances <10 mL/min.
        <br />
        https://doi.org/10.1093/ndtplus/sfr166
        https://doi.org/10.1186/s13643-015-0063-x
        https://pubmed.ncbi.nlm.nih.gov/2133626/
       `,
        evidence: "Strong"
      },
      {
        condition: "Dehydration, chronic diarrhoea",
        prevalance: "Common in the general population",
        comment: `There is no evidence to support this claim. Contrary, there is evidence that dehydration or chronic diarrhoea causes decreased magnesium levels in blood (hypomagnesaemia).
       `,
        evidence: "Weak"
      },
      {
        condition: "Diabetic ketoacidosis (when first seen)",
        prevalance: "Common in people with diabetes",
        comment: `In diabetic ketoacidosis body magnesium deficits through urinary losses are routinely encountered and are the consequence of absence of insulin. However, magnesium exit from the cells may cause hypermagnesemia, which is frequent at presentation with diabetic ketoacidosis.
        <br />
        https://doi.org/10.1016/0002-9343(58)90324-3
        https://doi.org/10.4239/wjd.v6.i8.1009
        `,
        evidence: "Strong"
      },
      {
        condition: "Adrenal insufficiency/Addison disease",
        prevalance: "Rare in the general population",
        comment: `Addison’s disease increases tubular magnesium (Mg) reabsorption.
        <br />
        https://doi.org/10.1002/ams2.334
        https://doi.org/10.2169/naika.95.846
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6357249/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperparathyroidism",
        prevalance: "Rare in the general population",
        comment: `There is evidence that an increase in parathyroid hormone (PTH) results in an increase in serum magnesium. However, an increase in magnesium results in a decrease in PTH.
        <br />
        https://doi.org/10.1056/NEJM198405103101904
        https://doi.org/10.1093/ndt/gft400
        https://doi.org/10.1016/s0272-6386(99)70106-x
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolysis",
        prevalance: "",
        comment: `Magnesium levels can increase in hemolysis patients. Red blood cells contain three times as much magnesium as compared to plasma. The rupture of these cells pours magnesium into the plasma. However, symptomatic hypermagnesemia occurs only in the case of aggressive hemolysis.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK549811/
        https://www.fortunejournals.com/articles/disorders-of-magnesium-metabolism-hypomagnesemia-and-hypermagnesemia.html
        `,
        evidence: "Strong"
      },
      {
        condition: "Use of magnesium-containin g drugs such as antacids or laxatives",
        prevalance: "",
        comment: `Magnesium containing medications are commonly used as laxatives, antacids, and as rectal enemas. Hypermagnesemia has often been described with the use of magnesium containing cathartics for treatment of drug overdose, in patients taking magnesium-containing cathartics and antacids for therapeutic purposes and following rectal administration of magnesium, even in the presence of normal renal function.
        <br />
        https://doi.org/10.1007/BF02234645
        https://doi.org/10.1016/s0009-8981(02)00308-x
        https://doi.org/10.1159/000168469
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Uncontrolled diabetes",
        prevalance: "Common in the general population",
        comment: `Insulin resistance reduces renal Mg2+ reabsorption resulting in urinary Mg2+ wasting. As a consequence, people with diabetes may end up in a vicious circle in which hypomagnesemia enhances insulin resistance and insulin resistance causes hypomagnesemia.
        <br />
        https://doi.org/10.1177/2042018820980240
        https://doi.org/10.2215/CJN.02960906
        https://doi.org/10.1371/journal.pone.0030599
       `,
        evidence: "Strong"
      },
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Alcohol intake leads to various electrolyte and mineral disturbances, and one of the most common disturbances is hypomagnesemia. With heavy alcohol intake, there can be a loss of magnesium from tissues and increased urinary loss.
        <br />
        https://doi.org/10.1016/S0946-672X(11)80026-X
        https://doi.org/10.1016/j.amjmed.2015.06.051
        https://doi.org/10.1093/alcalc/agaa001
       `,
        evidence: "Strong"
      },
      {
        condition: "Long-term diuretic use",
        prevalance: "Common in the general population",
        comment: `Diuretics cause an increased excretion of magnesium in the urine. Low serum and selected tissue magnesium levels have been reported among diuretic users.
        <br />
        https://doi.org/10.1093/oxfordjournals.aje.a114186
        https://doi.org/10.3390/ijms20092094
        https://doi.org/10.1093/oxfordjournals.aje.a114186
       `,
        evidence: "Strong"
      },
      {
        condition: "Prolonged diarrhea",
        prevalance: "Common in the general population",
        comment: `Impaired gastrointestinal magnesium absorption is a common underlying basis for hypomagnesemia, especially when the small bowel is involved, due to disorders associated with malabsorption, chronic diarrhea, or steatorrhea.
        <br />
        https://doi.org/10.1007/BF02231747
        https://doi.org/10.1016/j.ajem.2008.01.030
        https://doi.org/10.1186/1757-1626-2-156
       `,
        evidence: "Strong"
      },
      {
        condition: "Digestive disorders causing steatorrhoea such as Crohn disease",
        prevalance: "Common in the general population",
        comment: `Decreased oral intake, malabsorption and increased intestinal losses are the major causes of hypomagnesemia in these conditions.
        <br />
        https://doi.org/10.1007/s12328-014-0544-9
        https://doi.org/10.1378/chest.81.2.244
        https://pubmed.ncbi.nlm.nih.gov/3294519/
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1855626/
       `,
        evidence: "Strong"
      },
      {
        condition: "Severe burns",
        prevalance: "Common in the general population",
        comment: `Hypomagnesemia occurs in “40% of patients with severe thermal injury during the early period of recovery. Various mechanisms contribute to its development, such as increased urinary magnesium excretion, antibiotic therapy with aminoglycosides, increased magnesium losses through nasogastric suction attributable to hyperaldosteronism, and inadequate magnesium provision.
        <br />
        https://doi.org/10.1177/0148607187011004364
        https://doi.org/10.1093/ajcn/65.5.1473
        https://pubmed.ncbi.nlm.nih.gov/9129479/
       `,
        evidence: "Strong"
      },
      {
        condition: "Pre-eclampsia",
        prevalance: "Common in pregnant women",
        comment: `One theory suggests that since magnesium plays a role in blood pressure regulation, dietary deficiency of magnesium (Mg) may cause development of preeclampsia. Another theory suggests that deficiency of magnesium will potentiate and higher concentrations will inhibit the action of calcium in the smooth muscle. Calcium initiates smooth muscle contraction by binding to calmodulin and activating the enzyme myosin light chain kinase.
        <br />
        These two arguments form the basis for the belief that magnesium deficiency is a cause for causation of pre-eclampsia and pre- term labour.
        <br />
        https://doi.org/10.5812/ircmj.10394
        https://doi.org/10.4103/1119-3077.116887
        https://pubmed.ncbi.nlm.nih.gov/4049984/
        https://doi.org/10.1007/s12011-009-8423-9
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypoparathyroidism",
        prevalance: "Rare in the general population",
        comment: `Studies indicate that hypomagnesemia is the cause of hypoparathyroidism rather than the effect. It is believed that hypomagnesemia blocks the release of parathyroid hormone and probably also decreases the sensitivity to circulating parathyroid hormone in target organs and thereby causes a biochemical picture identical to primary hypoparathyroidism.
        <br />
        https://doi.org/10.1530/EC-15-0066
        https://pubmed.ncbi.nlm.nih.gov/17660616/
        https://doi.org/10.1210/jc.2015-3909
        https://doi.org/10.1016/j.endonu.2012.02.010
       `,
        evidence: "Strong"
      },
      {
        condition: "Low dietary intake, low gastrointestinal intake absorption",
        prevalance: "",
        comment: `Low dietary intake or low gastrointestinal intake absorption may be seen in the elderly, or people who are malnourished. In addition, severely ill patients may also have insufficient nutritional magnesium intake.
        <br />
        https://doi.org/10.5049/EBP.2008.6.2.86
        https://doi.org/10.1378/chest.95.2.391
        https://doi.org/10.1016/s0272-6386(12)80667-6
        https://doi.org/10.1016/j.archger.2009.07.002
       `,
        evidence: "Strong"
      },
      {
        condition: "Post-surgery",
        prevalance: "",
        comment: `Surgical trauma causes alterations in the electrolytes. In such situations, the body tries to retain sodium and chloride but cannot prevent the magnesium loss.
        <br />
        https://doi.org/10.1186/s12871-015-0116-7
        https://doi.org/10.1378/chest.95.2.391
        https://doi.org/10.1016/0006-2944(80)90082-4
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypercalcaemia",
        prevalance: "",
        comment: `Available evidence indicates that a high calcium intake may decrease magnesium absorption in addition to increasing magnesium requirements and decreasing serum magnesium levels.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/2132751/
        https://pubmed.ncbi.nlm.nih.gov/2701269/
        https://doi.org/10.1136/openhrt-2017-000617
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypocalcaemia",
        prevalance: "",
        comment: `Hypocalcaemia in hypomagnesemia is an effect rather than the cause hence described as "secondary" because it occurs as a consequence of hypomagnesemia. Magnesium is required for the production and release of parathyroid hormone, therefore, when magnesium is too low, insufficient parathyroid hormone is produced and blood calcium levels are also reduced (hypocalcaemia). Parathyroid hormone regulates calcium levels in the blood, largely by increasing the levels when they are too low.
        <br />
        https://doi.org/10.1172/JCI107159
        https://doi.org/10.1016/s0195-5616(98 )50057-5
        https://doi.org/10.1007/s00774-011-0275-7
       `,
        evidence: "Strong"
      },
      {
        condition: "Hyperadrenal function",
        prevalance: "",
        comment: `Aldosterone increases the clearance and excretion of magnesium.
        <br />
        https://doi.org/10.1080/0886022X.2019.1662439
        https://doi.org/10.1093/qjmed/hcw224
        https://doi.org/10.1080/0886022X.2019.1662439
       `,
        evidence: "Strong"
      }
    ];
  }

  // Calcium
  if (marker === 426) {
    data.high = [
      {
        condition: "Hyperthyroidism",
        prevalance: "Common in the general population",
        comment: `Thyroid hormones are known to cause bone resorption and mobilize calcium from bone to circulation leading to hypercalcemia.
        <br />
        https://doi.org/10.1097/MD.0000000000006017
        https://doi.org/10.4158/EP.9.6.517
        https://pubmed.ncbi.nlm.nih.gov/11233472/
       `,
        evidence: "Strong"
      },
      {
        condition: "Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `In kidney dysfunction, hypercalcemia can result from excessive bone resorption, renal calcium retention, excessive intestinal calcium absorption, or a combination of these conditions.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/937362/
        https://doi.org/10.1080/08860220500531005
        https://doi.org/10.1159/000167966
       `,
        evidence: "Strong"
      },
      {
        condition: "HIV/AIDS",
        prevalance: "Common in the general population",
        comment: `Hypercalcemia in people living with HIV is associated with solid organ malignancy, hematologic malignancy, and infection. Most people living with HIV with hypercalcemia are asymptomatic. Solid organ malignancy is associated with moderate to severe hypercalcemia, and as such people living with HIV presenting with moderate to severe hypercalcemia should be investigated for solid organ malignancy.
        <br />
        https://doi.org/10.1080/25787489.2020.1836900
        https://doi.org/10.1097/00007611-199909000-00017
        https://doi.org/10.1016/j.bonr.2018.100194
       `,
        evidence: "Strong"
      },
      {
        condition: "Metastasis (cancer)",
        prevalance: "Common in the general population",
        comment: `Cancer-associated hypercalcemia is due to the: elaboration of systemically-acting humoral factors by neoplasms which alter calcium metabolism in bone, kidney, and intestine; or stimulation of bone resorption at sites of tumor metastasis to bone. It is likely that both mechanisms occur in the same patient with certain neoplasms.
        <br />
        https://doi.org/10.1016/j.canep.2015.10.012
        https://pubmed.ncbi.nlm.nih.gov/1460860/
        https://doi.org/10.1677/erc.1.00543
       `,
        evidence: "Strong"
      },
      {
        condition: "Thiazide diuretics",
        prevalance: "Diuretic use is common in people with high blood pressure",
        comment: `Cancer-associated hypercalcemia is due to the: elaboration of systemically-acting humoral factors by neoplasms which alter calcium metabolism in bone, kidney, and intestine; or stimulation of bone resorption at sites of tumor metastasis to bone. It is likely that both mechanisms occur in the same patient with certain neoplasms.
        <br />
        https://doi.org/10.1210/jc.2015-3964
        https://doi.org/10.1097/MJT.0b013e3181c6c21b
        https://www.ncbi.nlm.nih.gov/books/NBK532918/
       `,
        evidence: "Strong"
      },
      {
        condition: "Kidney transplant",
        prevalance: "Common in patients with kidney failures",
        comment: `Elevated serum calcium related to persistent hyperparathyroidism is present in patients following kidney transplantation, although this generally reverts to normal within 6-8 months. Hyperparathyroidism in this setting is usually the result of autonomous production from enlarged glands.
        <br />
        https://doi.org/10.1007/s13730-018-0334-1
        https://doi.org/10.1111/j.1600-6143.2006.01475.x
        https://doi.org/10.1111/ctr.12291
       `,
        evidence: "Strong"
      },
      {
        condition: "Excess Vitamin D (Pyridoxine) intake /Vitamin D toxicity.",
        prevalance: "Rare in the general population",
        comment: `Vitamin D helps the intestine to absorb calcium from the foods, thus increasing the amount of calcium in the body.
        <br />
        https://doi.org/10.1210/jc.2011-1443.
        https://doi.org/10.5935/0101-2800.20160074
        https://pubmed.ncbi.nlm.nih.gov/3068626/
       `,
        evidence: "Strong"
      },
      {
        condition: "Adrenal insufficiency (Addison's disease)",
        prevalance: "Rare in the general population",
        comment: `A combination of increased calcium input into the extracellular space and reduced calcium removal by the kidney accounts for the hypercalcemia. The mechanisms responsible for the reduction in calcium removal are decreased glomerular filtration and increased tubular calcium reabsorption.
        <br />
        https://doi.org/10.1007/BF02411297
        https://doi.org/10.2169/internalmedicine.53.1104
        https://doi.org/10.2147/IMCRJ.S109840
       `,
        evidence: "Strong"
      },
      {
        condition: "Excess vitamin A intake",
        prevalance: "Rare in the general population",
        comment: `Hypercalcaemia can occur as a consequence of the effect of vitamin A on bone by an osteolytic effect (dissolution of bone or loss of calcium from bone), though the precise mechanism is not well understood.
        <br />
        https://doi.org/10.7727/wimj.2011.171
        https://doi.org/10.1155/2011/424712
        https://doi.org/10.1177/2324709618823805
       `,
        evidence: "Strong"
      },
      {
        condition: "Sarcoidosis",
        prevalance: "Rare in the general population",
        comment: `Hypercalcemia in sarcoidosis is due to the uncontrolled synthesis of 1,25-dihydroxyvitamin D3 by macrophages. 1,25-dihydroxyvitamin D3 leads to an increased absorption of calcium in the intestine and to an increased resorption of calcium in the bone.
        <br />
        https://doi.org/10.1024/0040-5930.64.5.281
        https://doi.org/10.1136/bcr-2015-210189
        https://pubmed.ncbi.nlm.nih.gov/17968303/
       `,
        evidence: "Strong"
      },
      {
        condition: "Tuberculosis",
        prevalance: "Rare in the general population",
        comment: `Hypercalcemia in pulmonary tuberculosis is due to excessive extra-renal 1-alpha hydroxylase activity. The 1 alpha-hydroxylase plays an important role in calcium homeostasis by catalyzing synthesis of the active form of vitamin D, 1,25-dihydroxyvitamin D(3), in the kidney. Vitamin D helps the intestine to absorb calcium from the foods, thus increasing the amount of calcium in the body.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/7761888/
        https://doi.org/10.7326/0003-4819-90-3-324
        https://doi.org/10.1053/rmed.2000.1019
       `,
        evidence: "Strong"
      },
      {
        condition: "Hyperparathyroidism",
        prevalance: "Rare in the general population",
        comment: `In primary hyperparathyroidism, an enlargement of one or more of the parathyroid glands causes overproduction of parathyroid hormone. Mechanistically, parathyroid hormone preserves blood calcium by several major effects: Stimulates production of the biologically-active form of vitamin D within the kidney. Facilitates mobilization of calcium and phosphate from bone. In secondary hyperparathyroidism, other diseases first cause low calcium levels in the body. Over time, increased parathyroid hormone levels occur.
        <br />
        https://doi.org/10.7861/clinmedicine.17-3-270
        https://doi.org/10.1093/ndtplus/sfq077
        https://pubmed.ncbi.nlm.nih.gov/19395781/
       `,
        evidence: "Strong"
      },
      {
        condition: "Prolonged immobilization",
        prevalance: "",
        comment: `People who have a condition that causes them to spend a lot of time sitting or lying down can develop hypercalcemia. Over time, bones that don't bear weight release calcium into the blood.
        <br />
        https://doi.org/10.11138/ccmbm/2016.13.1.046
        https://doi.org/10.1016/s0272-6386(00)70272-1
        https://doi.org/10.1542/peds.2015-0879
       `,
        evidence: "Strong"
      },
      {
        condition: "Alkalosis",
        prevalance: "",
        comment: `An increase in renal reabsorption of calcium occurs as a result of metabolic alkalosis and volume depletion, contributing to the maintenance of hypercalcemia.
        <br />
        Hypercalcemia on the other hand activates the calcium-sensing receptor, which enhances calcium excretion by its action in the thick ascending limb of the loop of Henle. This results in diuresis, volume depletion, metabolic alkalosis, and a decrease in glomerular filtration rate.
        <br />
        https://doi.org/10.2215/CJN.01451005
        https://doi.org/10.1053/j.ajkd.2011.11.028
       `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Chronic alcohol abuse causes hypomagnesaemia by decreasing renal tubular reabsorption. Hypomagnesaemia leads to suppression of parathyroid-hormone secretion, parathyroid-hormone resistance and vitamin-D suppression, resulting in hypocalcaemia. In addition, there is evidence that chronic heavy alcohol use can impair calcium absorption.
        <br />
        https://doi.org/10.1159/000046120
        https://doi.org/10.1016/j.alcohol.2012.07.004
        https://doi.org/10.1159/000198437
       `,
        evidence: "Strong"
      },
      {
        condition: "Liver diseases",
        prevalance: "Common in the general population",
        comment: `In liver diseases, inadequate vitamin D production and action, transient hypoparathyroidism induced by magnesium deficiency or rapid blood transfusion in patients with liver dysfunction can cause hypocalcemia.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/3116839/
        https://doi.org/10.1177/147323001204000219
        https://www.ncbi.nlm.nih.gov/books/NBK279022/
        https://pubmed.ncbi.nlm.nih.gov/681162/
       `,
        evidence: "Strong"
      },
      {
        condition: "Renal failure/ Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `Hypocalcemia in chronic renal failure is due to two primary causes - increased serum phosphorus and decreased renal production of 1,25 (OH)2 vitamin D. The former causes hypocalcemia by complexing with serum calcium and depositing it into bone and other tissues.
        <br />
        https://doi.org/10.1159/000169030
        https://doi.org/10.1159/000169030
        https://www.ncbi.nlm.nih.gov/books/NBK344077/
       `,
        evidence: "Strong"
      },
      {
        condition: "Magnesium deficiency",
        prevalance: "Rare in the general population",
        comment: `A person with very low levels of magnesium may also have a calcium deficiency. Magnesium helps to transport calcium in and out of cells. It may also contribute to the absorption of calcium.
        <br />
        https://doi.org/10.4103/ijem.IJEM_681_20
        https://doi.org/10.4103/ijem.IJEM_681_20
        https://doi.org/10.1007/s12328-014-0544-9
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypoparathyroidism (Underactive parathyroid gland)",
        prevalance: "Rare in the general population",
        comment: `Parathyroid hormone regulates serum calcium through its effects on bone, kidney, and the intestine: In bone, Parathyroid hormone enhances the release of calcium from the large reservoir contained in the bones. Bone resorption is the normal destruction of bone by osteoclasts, which are indirectly stimulated by parathyroid hormone.
        <br />
        https://doi.org/10.1159/000491042
        https://doi.org/10.5144/0256-4947.2000.364
        https://pubmed.ncbi.nlm.nih.gov/19236804/
       `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatitis (Acute inflammation of the pancrea",
        prevalance: "Rare in the general population",
        comment: `When the pancreas is damaged, free fatty acids are generated by the action of pancreatic lipase. Insoluble calcium salts are present in the pancreas, and the free fatty acids avidly chelate the salts, resulting in calcium deposition in the retroperitoneum. Therefore, hypocalcemia in pancreatitis is caused by precipitation of calcium soaps in the abdominal cavity. In addition, glucagon-stimulated calcitonin release and decreased parathyroid hormone secretion may play a role.
        <br />
        https://doi.org/10.4103/0972-5229.178182
        https://doi.org/10.1097/00006676-200304000-00001
        https://doi.org/10.20524/aog.2016.0015
       `,
        evidence: "Strong"
      },
      {
        condition: "Inherited resistance to the effects of parathyroid hormone",
        prevalance: "",
        comment: `Biological resistance to parathyroid hormone causes inadequate flow of calcium into extracellular fluids and deficient phosphate excretion by the kidney. Hypocalcemia is due to impaired mobilization of calcium from bone, reduced intestinal absorption of calcium, and increased urinary losses.
        <br />
        https://doi.org/10.12659/AJCR.883889
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3279267/
        https://www.ncbi.nlm.nih.gov/books/NBK279022/
       `,
        evidence: "Strong"
      },
      {
        condition: "Increased levels of phosphorus",
        prevalance: "",
        comment: `The phosphate builds up in your body and binds to calcium.
        <br />
        https://doi.org/10.1053/j.ajkd.2012.06.026
        https://doi.org/10.1111/j.1651-2227.1988.tb10638.x
        https://www.ncbi.nlm.nih.gov/books/NBK551586/
       `,
        evidence: "Strong"
      },
      {
        condition: "Malnutrition, Poor intake and/or absorption",
        prevalance: "",
        comment: `Hypocalcaemia in severe acute malnutrition (SAM) is associated with deficiency of potassium (K), magnesium (Mg) and Vitamin D.
        <br />
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4216963/
        https://doi.org/10.1017/S1368980020002499
        https://doi.org/10.1017/S1368980020001895
       `,
        evidence: "Strong"
      },
      {
        condition: "Low level of albumin (Hypoalbuminemia)",
        prevalance: "",
        comment: `A significant portion of calcium circulates bound to albumin, hence low serum albumin levels may result in a low serum total calcium despite normal ionized calcium levels.
        <br />
        https://doi.org/10.1080/08941939.2016.1235238
        https://doi.org/10.1016/0002-9343(88)90415-9
        https://doi.org/10.12659/AJCR.883889
       `,
        evidence: "Strong"
      },
      {
        condition: "Extreme deficiency in dietary calcium / poor intake or absorption",
        prevalance: "",
        comment: `A true calcium deficiency, or hypocalcemia, usually has nothing directly to do with the diet. Instead, blood levels of calcium become too low as a result of calcium malabsorption because of other conditions such as vitamin D deficiency. If Vitamin D-deficiency is so severe, calcitriol level also falls leading to malabsorption of calcium.
        <br />
        https://doi.org/10.3390/nu2090997
        https://doi.org/10.1359/jbmr.080607
        https://doi.org/10.1093/ajcn/65.3.790
       `,
        evidence: "Strong"
      } 
    ];
  }

  // Phosphorus
  if (marker === 1450) {
    data.high = [
      {
        condition: "Kidney failure/ dysfunction",
        prevalance: "Common in the general population",
        comment: `Normal working kidneys are efficient in removing extra phosphorus in the blood. However, in chronic kidney disease (CKD), the kidneys cannot remove phosphorus very well from blood resulting in hyperphosphatemia.
        <br />
        https://doi.org/10.1038/ki.2008.130
        https://doi.org/10.1371/journal.pone.0191290
        https://doi.org/10.1186/s12882-019-1556-y
       `,
        evidence: "Strong"
      },
      {
        condition: "Liver diseases",
        prevalance: "Common in the general population",
        comment: `It is believed that low blood phosphate develops in people whose livers regenerate rapidly. Elevated blood phosphate levels, therefore, means impaired regeneration.
        <br />
        https://doi.org/10.5414/CN108350
        https://doi.org/10.3109/08860229909045194
        https://doi.org/10.1097/01.TP.0000063219.21313.32
       `,
        evidence: "Strong"
      },
      {
        condition: "Diabetic ketoacidosis (when first seen)",
        prevalance: "Common in people with diabetes",
        comment: `Hyperphosphatemia is common in diabetic ketoacidosis before therapy. The increase in serum phosphorus is likely to be due to a transcellular shift. Potential factors responsible for the shift are serum glucose, through its osmotic effect, and the organic anions.
        <br />
        https://doi.org/10.1016/0002-9343(85)90053-1
        https://www.researchgate.net/publication/289672876_Severe_Symptomatic_Hypophosphatemia_With_Thrombocytopenia_in_a_Child_With_Diabetic_Ketoacidosis
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypoparathyroid ism",
        prevalance: "Rare in the general population",
        comment: `Hypoparathyroidism causes hyperphosphatemia through a failure of the kidneys to inhibit renal proximal tubule phosphate reabsorption.
        <br />
        https://doi.org/10.1007/s00424-018-2231-z
        https://doi.org/10.1016/j.ecl.2018.07.009
        https://doi.org/10.1177/2324709614527258
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin D toxicity",
        prevalance: "Rare in the general population",
        comment: `Excess Vitamin D increases intestinal phosphate absorption resulting in hyperphosphatemia.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK551586/
        https://doi.org/10.1007/s00424-018-2231-z
       `,
        evidence: "Strong"
      },
      {
        condition: "Increased dietary intake (phosphate supplementation)",
        prevalance: "",
        comment: `Long-term excessive phosphorus loading causes hyperphosphatemia.
        <br />
        https://doi.org/10.1111/j.1753-4887.2012.00473.x
        https://pubmed.ncbi.nlm.nih.gov/10584989/
        https://doi.org/10.1016/j.semnephrol.2012.12.018
       `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `Studies show significant increase in the mean serum levels of phosphorus in Hypothyroidism.
       `,
        evidence: "Strong"
      },
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Hypophosphataemia in alcoholics is due to various pathophysiological mechanisms, such as inappropriate phosphaturia, increased phosphorus entry into cells and increased gastrointestinal loss of phosphate.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/9536603/
        https://doi.org/10.1016/0016-5085(91)90223-8
        https://doi.org/10.1097/00000441-196607000-00012
        `,
        evidence: "Strong"
      },
      {
        condition: "Diarrhea",
        prevalance: "Common in the general population",
        comment: `Chronic diarrhea increases phosphate losses through the intestines.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK493172/
        https://doi.org/10.1093/annonc/mdr525
        https://pubmed.ncbi.nlm.nih.gov/25245653/
        `,
        evidence: "Strong"
      },
      {
        condition: "Severe burns",
        prevalance: "Common in the general population",
        comment: `Pathophysiological changes and therapeutic interventions post-burn affect serum phosphorus concentration.
        <br />
        https://doi.org/10.1097/TA.0b013e3182701e09
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3188225/
        https://doi.org/10.1016/j.burns.2019.03.015
        `,
        evidence: "Strong"
      },
      {
        condition: "Overuse of diuretics",
        prevalance: "Common in people with high blood pressure",
        comment: `Diuretics lower phosphate serum levels by enhancing renal excretion.
        <br />
        https://doi.org/10.1093/qjmed/hcq039
        https://doi.org/10.1053/j.ajkd.2011.08.035
        https://pubmed.ncbi.nlm.nih.gov/448890/
        `,
        evidence: "Strong"
      },
      {
        condition: "Diabetic ketoacidosis (after treatment)",
        prevalance: "Common in people with diabetes",
        comment: `Hypophosphatemia may be worsened during treatment of Diabetic ketoacidosis because insulin causes a shift of phosphate into the cellular compartment and fluid replacement dilutes the phosphate concentration.
        <br />
        https://doi.org/10.1111/j.1399-5448.2009.00569.x
        https://pubmed.ncbi.nlm.nih.gov/15510933/
        https://doi.org/10.1097/PEC.0b013e31821dc68a
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin D deficiency",
        prevalance: "Common in people of black and hispanic origin",
        comment: `Vitamin D regulates serum phosphate by modulating intestinal phosphate absorption.
        <br />
        https://doi.org/10.21203/rs.3.rs-30390/v1
        https://doi.org/10.1038/bonekey.2013.231
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3944128/
        `,
        evidence: "Strong"
      },
      {
        condition: "Increased blood calcium (hypercalcemia)",
        prevalance: "Common in cases of hyperparathyroi dism",
        comment: `When blood-calcium levels are too high, the parathyroid glands produce less
        Parathyroid hormone. But sometimes one or more of these glands produce too much hormone. This leads to abnormally high calcium levels and low phosphorus levels in your blood.
        <br />
        https://doi.org/10.1210/jc.2011-1319
        https://doi.org/10.3109/08860228309076050
        https://doi.org/10.1016/s0272-6386(97)90044-5
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperparathyroi dism",
        prevalance: "Rare in the general population",
        comment: `In primary hyperparathyroidism, serum phosphate levels are often low because of the phosphaturic effects of parathyroid hormone. In secondary hyperparathyroidism, low levels of calcium in the bloodstream cause high levels of parathyroid hormone to be produced. The high levels of parathyroid hormone stimulate the kidney to remove phosphate, leading to reduced levels of phosphate in the bloodstream.
        <br />
        https://doi.org/10.1503/cmaj.090675
        https://pubmed.ncbi.nlm.nih.gov/711493/
        https://doi.org/10.1007/s10157-016-1370-9
        `,
        evidence: "Strong"
      },
      {
        condition: "Rickets and osteomalacia (due to vitamin D deficiencies)",
        prevalance: "Rare in the general population",
        comment: `Rickets other than those associated with advanced kidney disease, isolated distal renal tubular acidosis (dRTA) and hypophosphatasia (defective tissue non-specific alkaline phosphatase) are associated with hypophosphatemia due to abnormal proximal tubular reabsorption of phosphate
        <br />
        https://doi.org/10.1136/bcr-2019-233350
        https://doi.org/10.4103/2230-8210.119503
        https://doi.org/10.1007/s11914-015-0259-y
        `,
        evidence: "Strong"
      },
      {
        condition: "Malnutrition",
        prevalance: "",
        comment: `Hypophosphatemia secondary to decreased input occurs when there is decreased oral intake or intestinal absorption. Hypophosphatemia resulting from poor intake is uncommon, because phosphorus is plentiful in the diet. It can occur, however, when an individual has been chronically and severely malnourished.
        <br />
        https://doi.org/10.1177/000992289803700603
        https://doi.org/10.4314/eamj.v86i7.54147
        https://doi.org/10.1038/s41430-018-0251-6
        `,
        evidence: "Strong"
      },
      {
        condition: "Decreased blood potassium (hypokalemia)",
        prevalance: "",
        comment: `Severe hypokalemia causes a marked increase in phosphate clearance, a decrease in tubular reabsorption of phosphate, and hypophosphatemia.
        <br />
        https://www.deepdyve.com/lp/american-medical-association/severe-hypophosphatemia-due-to-hypokalemia-Hr0YVBE4a4
        https://pubmed.ncbi.nlm.nih.gov/25245653/
        https://pubmed.ncbi.nlm.nih.gov/7841832/
        `,
        evidence: "Strong"
      },
      {
        condition: "Poor absorption of Phosphorus",
        prevalance: "",
        comment: `Hypophosphatemia secondary to inadequate intake of phosphate occurs in the setting of prolonged poor dietary sources of phosphate, intestinal malabsorption, and intestinal binding by exogenous agents.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK493172/
        https://doi.org/10.1210/jc.2011-1319
        https://doi.org/10.1177/000992289503400202
        `,
        evidence: "Strong"
      },
      {
        condition: "Increased insulin/high carbohydrate diet",
        prevalance: "",
        comment: `Phosphate is an active participant in energy metabolism, and its deficiency has been associated with changes in insulin sensitivity and glucose tolerance.
        <br />
        https://doi.org/10.1038/sj.ejcn.1602375
        https://doi.org/10.1213/XAA.0000000000000112
        https://doi.org/10.1038/sj.ejcn.1602375
        `,
        evidence: "Strong"
      },
      {
        condition: "Chronic antacid use",
        prevalance: "",
        comment: `Nonabsorbable antacids containing aluminum hy-droxide block the intestinal absorption of phosphorus and can lead to hypophosphatemia.
        <br />
        https://doi.org/10.1007/BF02555911
        https://doi.org/10.1345/aph.1D271
        https://doi.org/10.1177/106002809402800513
        `,
        evidence: "Strong"
      },
      {
        condition: "Poor protein digestion",
        prevalance: "",
        comment: `High-protein diets contain large quantities of phosphorus and are the main source of dietary phosphate.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/23023627/
        https://www.ncbi.nlm.nih.gov/books/NBK493172/
        https://doi.org/10.3945/ajcn.2008.26665
        `,
        evidence: "Strong"
      }
    ];
  }

  // Bicarbonate or Total Carbon Dioxide (CO2)
  if (marker === 446) {
    data.high = [
      {
        condition: "Severe, prolonged vomiting and/or diarrhea",
        prevalance: "Common in the general population",
        comment: `In pathologies with profuse watery diarrhea, bicarbonate within the intestines is lost through the stool due to increased motility of the gut. This leads to further secretion of bicarbonate from the pancreas and intestinal mucosa, leading to net acidification of the blood from bicarbonate loss.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482340/
        https://pubmed.ncbi.nlm.nih.gov/5845517
        https://doi.org/10.1097/00005176-199202000-00012
       `,
        evidence: "Strong"
      },
      {
        condition: "Lung diseases, including chronic obstructive pulmonary disease (COPD).",
        prevalance: "Common in the general population",
        comment: `Patients with late-stage chronic obstructive pulmonary disease (COPD) are prone to CO2 retention, a condition which is attributed to increased ventilation-perfusion mismatch particularly during oxygen therapy.
        <br />
        https://doi.org/10.1016/j.resp.2015.03.001
        https://www.ncbi.nlm.nih.gov/books/NBK525962/
        https://doi.org/10.1155/2012/915150
       `,
        evidence: "Strong"
      },
      {
        condition: "Conn’s syndrome (Primary aldosteronism)",
        prevalance: "Common in people with high blood pressure",
        comment: `The associated metabolic alkalosis (increased bicarbonate) in Conn syndrome (primary aldosteronism) is due to increased renal hydrogen ion loss mediated by hypokalemia and aldosterone.
        <br />
        https://doi.org/10.1016/j.resp.2015.03.001
        https://www.ncbi.nlm.nih.gov/books/NBK525962/
        https://doi.org/10.1155/2012/915150
       `,
        evidence: "Strong"
      },
      {
        condition: "Cushing syndrome",
        prevalance: "Rare in the general population.",
        comment: `Metabolic alkalosis (increased blood bicarbonate) is more common in Cushing syndrome caused by ectopic Adrenocorticotropic Hormone (ACTH production than in other causes of Cushing syndrome.
          <br />
        https://doi.org/10.1016/j.rmcr.2018.08.019
        https://doi.org/10.4103/ijem.IJEM_581_18
        https://doi.org/10.1111/j.1749-6632.2002.tb04419.x
       `,
        evidence: "Strong"
      },
      {
        condition: "Metabolic alkalosis",
        prevalance: "",
        comment: `The primary pH buffer system in the human body is the bicarbonate (HCO3)/carbon dioxide (CO2) chemical equilibrium system. HCO3 functions as an alkalotic substance. CO2 functions as an acidic substance. Therefore, increases in HCO3 or decreases in CO2 will make blood more alkalotic. The opposite is also true where decreases in HCO3 or an increase in CO2 will make blood more acidic. CO2 levels are physiologically regulated by the pulmonary system through respiration, whereas the HCO3 levels are regulated through the renal system with reabsorption rates. Therefore, metabolic alkalosis is an increase in serum HCO3.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482291/
        https://doi.org/10.1080/17843286.2018.1539373
        https://pubmed.ncbi.nlm.nih.gov/9294840/
       `,
        evidence: "Strong"
      },
      {
        condition: "Chronic respiratory acidosis (hypoventilation)",
        prevalance: "",
        comment: `Respiratory acidosis typically occurs due to failure of ventilation and accumulation of carbon dioxide. The primary disturbance is an elevated arterial partial pressure of carbon dioxide (pCO2) and a decreased ratio of arterial bicarbonate to arterial pCO2, which results in a decrease in the pH of the blood.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482430/.
        https://www.ncbi.nlm.nih.gov/books/NBK482456/
        https://pubmed.ncbi.nlm.nih.gov/20979672/
       `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Chronic diarrhea",
        prevalance: "Common in the general population",
        comment: `In chronic diarrhea, the loss of too much sodium bicarbonate from the body, causes Hyperchloremic acidosis. Hyperchloremic acidosis is a form of metabolic acidosis associated with a normal anion gap, a decrease in plasma bicarbonate concentration, and an increase in plasma chloride concentration.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482340/
        https://doi.org/10.23736/S0391-1977.19.03059-1
        https://doi.org/10.1093/ckj/sfu126
       `,
        evidence: "Strong"
      },
      {
        condition: "Kidney disease",
        prevalance: "Common in the general population",
        comment: `Metabolic acidosis is commonly found in patients with chronic kidney disease (CKD), and its causes are: impaired ammonia excretion, reduced tubular bicarbonate reabsorption and insufficient renal bicarbonate production in relation to the amount of acids synthesized by the body and ingested with food.
        <br />
        https://doi.org/10.1159/000490475
        https://doi.org/10.1053/j.ajkd.2005.03.003
        https://doi.org/10.26574/maedica.2018.13.4.267
       `,
        evidence: "Strong"
      },
      {
        condition: "Septic Shock",
        prevalance: "Common in the general population",
        comment: `During hemorrhagic shock, metabolic acidosis is common and conventionally considered to be due essentially to elevated lactate-to-pyruvate ratio. The increase in blood lactate generally originates from both increased lactate production and reduced lactate metabolism.
        <br />
        https://doi.org/10.1097/ccm.0b013e3181a59165
        https://doi.org/10.2174/187153010791936900
        https://pubmed.ncbi.nlm.nih.gov/16556122/
       `,
        evidence: "Strong"
      },
      {
        condition: "Diabetic ketoacidosis",
        prevalance: "Common in people with diabetes",
        comment: `Acidosis in DKA is due to the overproduction of β-hydroxybutyric acid and acetoacetic acid. At physiological pH, these 2 ketoacids dissociate completely, and the excess hydrogen ions bind the bicarbonate, resulting in decreased serum bicarbonate levels.
        <br />
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC151994/
        https://doi.org/10.2337/diacare.2951150
        https://doi.org/10.1210/jcem.81.1.8550770
       `,
        evidence: "Strong"
      },
      {
        condition: "Metabolic acidosis",
        prevalance: "Common in people with renal failure, and, in early to moderate stages of chronic kidney disease",
        comment: `Metabolic acidosis is due to alterations in bicarbonate. Therefore, the partial pressure of carbon dioxide (PCO2) is less than 40 since it is not the cause of the primary acid-base disturbance. In metabolic acidosis, the distinguishing lab value is a decreased bicarbonate (normal range 21 to 28 mEq/L). The normal anion gap is 12. The partial pressure of carbon dioxide (PCO2) is the measure of carbon dioxide within arterial or venous blood.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482146/
        https://doi.org/10.1681/ASN.2007121329
        https://doi.org/10.1186/s13613-019-0563-2
       `,
        evidence: "Strong"
      },
      {
        condition: "Addison disease",
        prevalance: "Rare in the general population",
        comment: `Cortisol insufficiency induces the secretion of antidiuretic hormone (ADH), resulting in syndrome of inappropriate secretion of antidiuresis (SIAD)-like conditions. The metabolic acidosis is due to insufficiency of aldosterone, which decreases acid secretion in the kidney.
        <br />
        https://doi.org/10.1093/omcr/omv063
        https://doi.org/10.1186/s13256-021-02724-6
        https://doi.org/10.1136/bcr.12.2011.5328
       `,
        evidence: "Strong"
      },
      {
        condition: "Chronic respiratory alkalosis (hyperventilation)",
        prevalance: "",
        comment: `Bicarbonate (HCO3) functions as an alkalotic substance. CO2 (carbon dioxide) functions as an acidic substance. Therefore, Increases in HCO3 (bicarbonate) or decreases in CO2 will make blood more alkalotic. The opposite is also true where decreases in HCO3 or an increase in CO2 will make blood more acidic. CO2 levels are physiologically regulated by the pulmonary system through respiration, whereas the HCO3 levels are regulated through the renal system with reabsorption rates. Therefore, respiratory alkalosis is a decrease in serum CO2. While it is theoretically possible to have decreased CO2 production, in every scenario this illness is a result of hyperventilation where CO2 is breathed away.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482117/
        https://doi.org/10.1053/j.ajkd.2017.04.017
        https://doi.org/10.1056/NEJM199105163242003
       `,
        evidence: "Strong"
      },
      {
        condition: "Ethylene glycol or methanol poisoning",
        prevalance: "",
        comment: `Significant methanol ingestion leads to metabolic acidosis, which is manifested by a low serum bicarbonate level. The anion gap is increased secondary to high lactate and ketone levels. This is probably due to formic acid accumulation.
        <br />
        In ethylene glycol poisoning following ingestion, ethylene glycol is first hepatically metabolized to glycoaldehyde by alcohol dehydrogenase. Glycoaldehyde is then oxidized to glycolic acid, glyoxylic acid and finally oxalic acid. While ethylene glycol itself causes intoxication, the accumulation of toxic metabolites is responsible for the potentially fatal acidosis and renal failure, which characterizes ethylene glycol poisoning.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK482117/
        https://doi.org/10.1053/j.ajkd.2017.04.017
        https://doi.org/10.1056/NEJM199105163242003
       `,
        evidence: "Strong"
      },
      {
        condition: "Ethylene glycol or methanol poisoning",
        prevalance: "",
        comment: `Significant methanol ingestion leads to metabolic acidosis, which is manifested by a low serum bicarbonate level. The anion gap is increased secondary to high lactate and ketone levels. This is probably due to formic acid accumulation.
        <br />
        In ethylene glycol poisoning following ingestion, ethylene glycol is first hepatically metabolized to glycoaldehyde by alcohol dehydrogenase. Glycoaldehyde is then oxidized to glycolic acid, glyoxylic acid and finally oxalic acid. While ethylene glycol itself causes intoxication, the accumulation of toxic metabolites is responsible for the potentially fatal acidosis and renal failure, which characterizes ethylene glycol poisoning.
        <br />
        https://doi.org/10.1016/0002-9343(80)90113-8
        https://doi.org/10.2165/00003495-200161070-00006
        https://doi.org/10.1016/S0750-7658(87)80004-7
       `,
        evidence: "Strong"
      },
      {
        condition: "Salicylate (aspirin) overdose",
        prevalance: "",
        comment: `Aspirin has a direct effect on the respiratory center in the brain leading to hyperventilation. The body responds to hyperventilation by having the kidneys produce more bicarbonate and excrete more potassium which leads to an elevated anion gap metabolic acidosis.
        <br />
        https://doi.org/10.12659/AJCR.920016
        https://doi.org/10.1002/ccr3.2346
        https://doi.org/10.1007/s13181-013-0362-3
       `,
        evidence: "Strong"
      }
    ];
  }

  // Chloride
  if (marker === 502) {
    data.high = [
      {
        condition: "Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `The kidneys play an important role in the regulation of chloride in the body, so an imbalance in this electrolyte may be related to a problem with the kidneys.
        <br />
        https://doi.org/10.1620/tjem.149.145
        https://doi.org/10.1186/s12882-020-01828-3
        https://doi.org/10.1186/s13054-016-1499-7
        `,
        evidence: "Strong"
      },
      {
        condition: "Diarrhea, Dehydration",
        prevalance: "Common in the general population",
        comment: `Loss of body fluids can cause hyperchloremic metabolic acidosis because of loss of bicarbonate-rich, chloride-poor fluid (i.e., excessive sodium loss).
        <br />
        https://doi.org/10.1053/j.gastro.2011.01.065
        https://www.ncbi.nlm.nih.gov/books/NBK482340/
        https://www.ncbi.nlm.nih.gov/books/NBK309/
        https://www.ncbi.nlm.nih.gov/books/NBK309/
        `,
        evidence: "Strong"
      },
      {
        condition: "Metabolic acidosis",
        prevalance: "Common in people with renal failure, and, in early to moderate stages of chronic kidney disease",
        comment: `Infusion of large volumes of solutions containing sodium chloride and no alkali can cause a hyperchloremic metabolic acidosis. This is due to a dilution of the preexisting bicarbonate and to decreased renal bicarbonate reabsorption as a result of volume expansion.
        <br />
        https://doi.org/10.1136/bmj.3.5772.444
        https://www.ncbi.nlm.nih.gov/books/NBK482340/
        https://doi.org/10.1080/22201181.2015.1062616
        `,
        evidence: "Strong"
      },
      {
        condition: "Cushing syndrome",
        prevalance: "Rare in the general population",
        comment: `While there is evidence that Cushing syndrome may cause high blood sodium, there is no evidence that Cushing syndrome is associated with cases of hyperchloremia.
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperparathyroidi sm",
        prevalance: "Rare in the general population",
        comment: `It is believed that exaggeration of the physiological effect of parathormone
        (parathyroid hormone, also called parathyrin) on bicarbonate reabsorption may be responsible for the frequent finding of hyperchloremia in association with primary hyperparathyroidism.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/5012229/
        https://doi.org/10.1152/ajprenal.1983.245.4.F450
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperventilation (respiratory alkalosis).",
        prevalance: "",
        comment: `Hyperchloremia can occur when the serum bicarbonate is low with a concomitant rise in chloride as occurs with a normal anion gap metabolic acidosis or respiratory alkalosis. Respiratory alkalosis is a condition marked by a low level of carbon dioxide in the blood due to breathing excessively.
        <br />
        https://doi.org/10.1016/j.nefro.2016.04.001
        https://doi.org/10.6002/ect.2018.0099
        https://www.ncbi.nlm.nih.gov/books/NBK482117/
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Chronic respiratory acidosis (hypoventilation), emphysema",
        prevalance: "Emphysema is common in the general population",
        comment: `Hypochloremia is caused by increased renal chloride excretion as an adaptation to chronic respiratory acidosis.
        <br />
        https://doi.org/10.1097/00007611-198610000-00025
        https://doi.org/10.1172/JCI103758
       `,
        evidence: "Strong"
      },
      {
        condition: "Diabetic ketoacidosis",
        prevalance: "Common in people with diabetes",
        comment: `It is believed that hypochloremia, caused by chloride moving into the intracellular compartment, could be a response to accumulating tissue anions in blood. In diabetic ketoacidosis, hypochloremia implies hypochloremic alkalosis, which could be a metabolic compensation for metabolic acidosis. The inverse correlation of [Cl−] and [XA−] supports this assumption: The more ketoacids, the less chloride.
        <br />
        https://doi.org/10.1210/jc.2016-1324
        https://doi.org/10.1007/s00125-003-1119-3
       `,
        evidence: "Strong"
      },
      {
        condition: "Adrenal insufficiency (Addison disease), aldosterone deficiency",
        prevalance: "Rare in the general population",
        comment: `In these conditions, hypochloremia is due to renal losses of chloride (and sodium).
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK309/
       `,
        evidence: "Strong"
      },
      {
        condition: "Congestive heart failure",
        prevalance: "Rare in the general population",
        comment: `Low serum chloride has strongly been associated with impaired decongestion.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK309/
        https://doi.org/10.1161/CIRCHEARTFAILURE.116.003109
       `,
        evidence: "Strong"
      },
      {
        condition: "Prolonged vomiting or gastric suction",
        prevalance: "Prolonged vomiting may deplete chloride to a higher degree than sodium because of the high proportion of chloride in gastric fluid",
        comment: `Low serum chloride has strongly been associated with impaired decongestion.
        <br />
        https://doi.org/10.2147/IJGM.S66550
        https://www.ncbi.nlm.nih.gov/books/NBK309/
       `,
        evidence: "Strong"
      },
      {
        condition: "Metabolic alkalosis",
        prevalance: "",
        comment: `There are two types of metabolic alkalosis: Chloride-responsive alkalosis results from loss of hydrogen ions, usually by vomiting or dehydration. Chloride-resistant alkalosis results when the body retains too much bicarbonate (alkaline) ions. The reabsorption of sodium bicarbonate (NaHCO 3) in the proximal and distal tubule is augmented because total body chloride depletion results in both extracellular fluid (ECF) volume contraction (which stimulates HCO3 reabsorption) and decreased quantities of filtered chloride available to the tubules for reabsorption with sodium.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/2240795/
        https://doi.org/10.2147/IJGM.S66550
        https://doi.org/10.1097/00007611-19861000-00025
       `,
        evidence: "Strong"
      }
    ];
  }

  // Hemoglobin
  if (marker === 948) {
    data.high = [
      {
        condition: "Insulin resistance",
        prevalence: "Common in the general population",
        comment: `Hyperinsulinemia exerts its effects in erythropoiesis through different mechanisms. The presence of the insulin receptor (INS-R) in human erythropoietic cells during all stages of development suggests that insulin acts as a co-factor in erythropoiesis. Hyperinsulinemia also increases concentrations of hypoxia-inducible factor-1 alpha (HIF-1 alpha). HIF-1 alpha promotes the synthesis of erythropoietin and may also mediate intestinal iron absorption.
        <br />
        https://doi.org/10.1002/dmrr.3194
        https://doi.org/10.1590/s0004-27302006000100016
        https://doi.org/10.1002/stem.5530120309
        `,
        evidence: "Strong"
      },
      {
        condition: "Smoking—heavy smokers have higher hemoglobin levels than nonsmokers",
        prevalence: "Common in the general population",
        comment: `Increased number of erythrocytes and values of hematocrit in smokers can be
        explained by the fact that tissue hypoxia caused by increased creation of carboxy hemoglobin leads to an increased secretion of erythropoietin, thus increasing erythropoiesis.
        <br />
        https://doi.org/10.5455/medarh.2017.71.132-136
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1291473/#
        https://doi.org/10.1136/bcr.08.2011.4714
        `,
        evidence: "Strong"
      },
      {
        condition: "Dehydration",
        prevalence: "Common in the general population",
        comment: `Relative polycythemia is associated with an elevated packed cell volume (PCV) but normal red blood cell mass which may occur due to decreased plasma volume caused by dehydration or body fluid shifts.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK562233/
        https://pubmed.ncbi.nlm.nih.gov/11399580/
        `,
        evidence: "Strong"
      },
      {
        condition: "Lung (pulmonary) disease",
        prevalence: "Common in the general population",
        comment: `Decreased oxygen saturation causes a compensatory rise in haemoglobin and haematocrit levels in Lung disease.
        <br />
        https://doi.org/10.1378/chest.92.5.867
        https://doi.org/10.1136/thx.36.5.321
        https://doi.org/10.1161/01.cir.18.1.107
        `,
        evidence: "Strong"
      },
      {
        condition: "Congenital heart disease",
        prevalence: "Common in babies",
        comment: `Decreased arterial oxygen saturation in cyanotic congenital heart disease causes a compensatory rise in haemoglobin and haematocrit levels.
        <br />
        https://doi.org/10.1007/s11606-007-0356-4
        https://pubmed.ncbi.nlm.nih.gov/8322297/
        `,
        evidence: "Strong"
      },
      {
        condition: "Thiamin deficiency",
        prevalence: "Rare in the general population",
        comment: `Thiamin deficiency conditions stimulate erythropoietin production and hence the number of red blood cells increases.
        <br />
        https://doi.org/10.1254/jjp.31.985
        `,
        evidence: "Strong"
      },
      {
        condition: "Polycythemia vera",
        prevalence: "Rare in the general population",
        comment: `Polycythemia vera is a rare blood disease in which the body makes too many red blood cells, making the blood thicker than normal and causing blood clots.
        <br />
        https://doi.org/10.1007/s11864-018-0529-x
        `,
        evidence: "Strong"
      },
      {
        condition: "Genetic causes (altered oxygen sensing, abnormality in hemoglobin oxygen release)",
        prevalence: "Rare in the general population",
        comment: `Idiopathic erythrocytosis is a disease defined by an increase in red blood cell mass. The differential diagnosis of erythrocytosis is extensive, and can be divided into primary and secondary forms. Primary erythrocytoses are due to intrinsic defects in erythroid precursor cells and are characterized by low erythropoietin levels. Secondary erythrocytoses are extrinsic to erythroid progenitors and are characterized by either high or inappropriately normal erythropoietin levels. A distinct subset of secondary erythrocytoses are due to genetic mutations in key proteins of the oxygen sensing pathway. These proteins constitute the core molecular machinery of oxygen-sensing with respect to red blood cell control.
        <br />
        https://doi.org/10.1155/2013/495724
        https://doi.org/10.1016/j.blre.2008.04.003
        `,
        evidence: "Strong"
      },
      {
        condition: "Elevated testosterone",
        prevalence: "",
        comment: `Testosterone stimulates erythropoiesis by stimulating erythropoietin (EPO) and recalibrating the set point of EPO in relation to hemoglobin and by increasing iron utilization for erythropoiesis.
        <br />
        https://doi.org/10.1093/gerona/glt154
        https://doi.org/10.1503/cmaj.170683
        https://doi.org/10.1016/j.sxmr.2017.04.001
        `,
        evidence: "Strong"
      },
      {
        condition: "Living at high altitudes",
        prevalence: "",
        comment: `People living in high altitudes can develop polycythemia. In high altitudes, increased red blood cell production occurs in order to compensate for the low ambient oxygen levels and inadequate tissue oxygenation.
        <br />
        https://doi.org/10.1164/arrd.1978.118.4.659
        `,
        evidence: "Strong"
      },
      {
        condition: "Kidney tumors that produce excess erythropoietin",
        prevalence: "",
        comment: `Erythropoietin ( EPO) production by renal cell carcinoma (RCC) cells and cyst epithelial cells in the kidney may cause an increase in the number of red blood cells (polycythemia).
        <br />
        https://doi.org/10.1155/2019/3792514
        https://doi.org/10.3892/ol.2014.2469
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Iron deficiency",
        prevalance: "Common in the general population",
        comment: `Iron deficiency anemia occurs when the body doesn't have enough iron to produce hemoglobin. Hemoglobin is the part of red blood cells that gives blood its red color and enables the red blood cells to carry oxygenated blood throughout your body.
        <br />
        https://doi.org/10.3329/jhpn.v28i4.6042
        https://doi.org/10.1016/j.mcna.2016.09.004
        https://doi.org/10.1177/1756283X11398736
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `Anemia in hypothyroidism might result from bone marrow depression, decreased erythropoietin production, comorbid diseases, or concomitant iron, vitamin B12, or folate deficiency.
        <br />
        https://doi.org/10.20452/pamw.3985
        https://doi.org/10.23750/abm.v88i1.6048
        https://pubmed.ncbi.nlm.nih.gov/10518398/
       `,
        evidence: "Strong"
      },
      {
        condition: "Chronic inflammatory diseases or conditions",
        prevalance: "Common in the general population",
        comment: `Inflammation may prevent the body from using stored iron to make enough healthy red blood cells, leading to anemia.
        <br />
        https://doi.org/10.1159/000452104
        https://doi.org/10.1182/blood-2018-06-856500
        https://doi.org/10.1182/asheducation-2010.1.276
       `,
        evidence: "Strong"
      },
      {
        condition: "Liver disease",
        prevalance: "Common in the general population",
        comment: `Chronic liver diseases frequently are associated with hematological abnormalities. A major cause of anemia associated with chronic liver disease is hemorrhage, especially into the gastrointestinal tract.
        <br />
        https://doi.org/10.3748/wjg.15.4653
        https://doi.org/10.20524/aog.2017.0152
        https://doi.org/10.1111/liv.14229
       `,
        evidence: "Strong"
      },
      {
        condition: "Kidney failure",
        prevalance: "Common in the general population",
        comment: `Many factors contribute to declining hemoglobin as kidney disease progresses, but impaired production of erythropoietin by failing kidneys is a central cause. To get the marrow to make red blood cells, the kidneys make a hormone called erythropoietin, or EPO. When the kidneys are damaged, they may not make enough EPO. Without enough EPO, the bone marrow does not make enough red blood cells, and one develops anemia.
        <br />
        https://doi.org/10.1007/s00467-017-3663-y
        https://www.ncbi.nlm.nih.gov/books/NBK539871/
        https://pubmed.ncbi.nlm.nih.gov/29087100/
       `,
        evidence: "Strong"
      },
      {
        condition: "Protein deficiency",
        prevalance: "Rare in the general population",
        comment: `Decreased metabolic activity resulting from protein deficiency impairs the release of erythropoietin (EPO), which causes inadequate production of the red blood cells hence the development of anemia.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/4905913/
        https://doi.org/10.1007/978-1-4615-7308-1_21
        https://doi.org/10.1016/s0022-3476(61)80237-0
       `,
        evidence: "Strong"
      },
      {
        condition: "Arginine deficiency",
        prevalance: "Rare in the general population",
        comment: `Arginine deficiency is an effect of hemolysis rather than the cause. Within the red blood cells is a high concentration of an arginine-consuming enzyme called arginase. Hemolysis, in which red blood cells rupture, is what releases arginase that causes the arginine deficiency. Therefore, the excess arginase activity is the hallmark of the arginine deficient state of Sickle cell disease.
        <br />
        https://doi.org/10.1177/0884533617691250
        https://doi.org/10.1097/MCO.0b013e32834d1a08
        https://doi.org/10.1001/jama.294.1.81
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B12 or B9 (Folate) deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin B12 or B9 (commonly called folate) deficiency anaemia occurs when a lack of vitamin B12 or folate causes the body to produce abnormally large red blood cells that cannot function properly.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK535377/
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1542974/
        https://doi.org/10.7861/clinmedicine.15-2-145
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin E deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin E deficiency, though quite rare, can cause hemolytic anemia because vitamin E protects the red blood cell membrane from oxidative damage. Vitamin E deficiency anemia usually affects only premature infants and children with cystic fibrosis.
        <br />
        https://doi.org/10.1172/JCI108760
        https://doi.org/10.1093/ajcn/27.8.1141
        https://doi.org/10.1093/ajcn/21.1.45
       `,
        evidence: "Strong"
      },
      {
        condition: "Zinc deficiency",
        prevalance: "Rare in the general population",
        comment: `Zinc is a catalyst for many enzymes that are needed for red blood cell production; as a result, zinc deficiency may result in anemia. In addition, impaired iron absorption can be caused by a decrease in trace elements such as zinc.
        <br />
        https://doi.org/10.3945/jn.116.235127
        https://doi.org/10.7759/cureus.3811
        http://dx.doi.org/10.1136/archdischild-2012-302724.0753
       `,
        evidence: "Strong"
      },
      {
        condition: "Copper deficiency",
        prevalance: "Rare in the general population",
        comment: `Copper is essential for absorbing iron from the gut. When copper levels are low, the body may absorb less iron. This can cause iron deficiency anemia.
        <br />
        https://doi.org/10.1080/20009666.2017.1351289
        https://doi.org/10.1007/s00277-018-3407-5
        https://doi.org/10.1111/bjh.12577
       `,
        evidence: "Strong"
      },
      {
        condition: "Selenium deficiency",
        prevalance: "Rare in the general population",
        comment: `Three possible biological mechanisms have been suggested for the involvement of Selenium deficiency in the development of anemia: increased oxidative stress, modulation of inflammation through induction of interleukin-6, and increased expression of heme oxygenase-1.
        <br />
        https://doi.org/10.1515/jbcr-2017-0002
        https://doi.org/10.1385/BTER:112:2:97
        https://doi.org/10.3177/jnsv.54.454
        https://doi.org/10.1038/sj.ejcn.1602889
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B6 deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin B6 plays a role in the production of the red blood cells.
        <br />
        https://doi.org/10.1038/ejcn.2009.125
        https://www.ncbi.nlm.nih.gov/books/NBK470579/
        https://pubmed.ncbi.nlm.nih.gov/1215909/
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin A deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin A is involved in the pathogenesis of anemia through diverse biological mechanisms, such as the enhancement of growth and differentiation of erythrocyte progenitor cells, potentiation of immunity to infection and reduction of the anemia of infection, and mobilization of iron stores from tissues.
        <br />
        https://doi.org/10.1038/sj.ejcn.1601320
        https://doi.org/10.1038/sj.ejcn.1601320
        https://doi.org/10.4314/eamj.v82i6.9301
       `,
        evidence: "Strong"
      },
      {
        condition: "Excessive destruction of red blood cells, for example in hemolytic anemia, hemoglobinopathy, hereditary spherocytosis, G6PD deficiency",
        prevalance: "Rare in the general population",
        comment: `Hemolytic anemia is a disorder in which red blood cells are destroyed faster than they can be made. The destruction of red blood cells is called hemolysis.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/30215915/
        https://www.ncbi.nlm.nih.gov/books/NBK558904/
        https://pubmed.ncbi.nlm.nih.gov/15202694/
       `,
        evidence: "Strong"
      },
      {
        condition: "Decreased hemoglobin production (e.g., thalassemia)",
        prevalance: "Rare in the general population",
        comment: `The thalassemia syndromes are hemoglobin disorders that result from significantly reduced or absent synthesis of either the α- or β-globin chains. The result is a chronic hemolytic anemia with ineffective erythropoiesis and bone marrow overstimulation.
        <br />
        https://doi.org/10.1016/j.pcl.2013.08.008
        https://www.ncbi.nlm.nih.gov/books/NBK545151/
        https://doi.org/10.1080/08998280.2007.11928230
       `,
        evidence: "Strong"
      },
      {
        condition: "Magnesium deficiency",
        prevalance: "Rare in the general population",
        comment: `Little is known as to whether magnesium intake is related to anemia in humans. Nevertheless, common belief is that since magnesium intake is inversely associated with inflammation and inflammation is an important cause of anemia, magnesium deficiency may indirectly cause anemia.
        <br />
        https://doi.org/10.1016/j.nut.2008.05.002
        https://doi.org/10.1182/blood.V41.3.451.451
       `,
        evidence: "Strong"
      },
      {
        condition: "Exercise",
        prevalance: "",
        comment: `Despite stimulated erythropoiesis, intense exercise can decrease the red blood cell mass by intravascular hemolysis mainly of senescent red blood cells, which is caused by mechanical rupture when red blood cells pass through capillaries in contracting muscles, and by compression of red cells e.g., in foot soles during running or in hand palms in weightlifters. Together, these adjustments cause a decrease in the average age of the population of circulating red blood cells in trained athletes.
        <br />
        https://doi.org/10.3389/fphys.2013.00332
       `,
        evidence: "Strong"
      },
      {
        condition: "Bone marrow disorders such as aplastic anemia, myelodysplastic syndrome, or cancers such as leukemia, lymphoma, multiple myeloma",
        prevalance: "",
        comment: ``,
        evidence: ""
      },
      {
        condition: "Damage to the bone marrow due to a toxin, radiation, chemotherapy",
        prevalance: "",
        comment: ``,
        evidence: ""
      },
      {
        condition: "Excessive loss of blood from, for example, severe trauma or chronic bleeding",
        prevalance: "",
        comment: ``,
        evidence: ""
      }
    ];
  }

  // Mean corpuscular volume (MCV), mean corpuscular hemoglobin (MCH), and mean corpuscular hemoglobin concentration (MCHC)
  if (marker === 3006) {
    data.high = [
      {
        condition: "Alcohol",
        prevalence: "Common in the general population",
        comment: `Long-term use of alcohol may have a direct toxic effect on the bone marrow, causing macrocytosis; in addition, macrocytosis may result from poor nutritional intake in the alcohol consuming population.
        <br />
        https://doi.org/10.1080/13556210410001674031
        https://doi.org/10.1111/j.1530-0277.1991.tb00615.x
        https://pubmed.ncbi.nlm.nih.gov/522526/
        https://pubmed.ncbi.nlm.nih.gov/1360215/
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B12 and/or folate deficiency",
        prevalence: "Rare in the general population",
        comment: `Vitamin B12 deficiency is a cause of macrocytosis because DNA synthesis requires cyanocobalamin (vitamin B12) as a cofactor. A deficiency of the vitamin leads to decreased DNA synthesis in the erythrocyte, thus resulting in macrocytosis.
        <br />
        https://doi.org/10.3121/cmr.4.3.236
        https://doi.org/10.12669/pjms.306.5413
        https://doi.org/10.3121/cmr.4.3.236
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin C deficiency",
        prevalence: "Rare in the general population",
        comment: `Macrocytic anemia may develop with vitamin C deficiency because vitamin C interacts with folic acid in the generation of tetrahydrofolic acid. Tetrahydrofolic acid is a cofactor in many reactions, especially in the synthesis (or anabolism) of amino acids and nucleic acids.
        <br />
        https://doi.org/10.1177/1179547619849036
        https://doi.org/10.1016/S0083-6729(08)60779-7
        https://doi.org/10.1111/j.0954-6820.1964.tb00955.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Thiamin deficiency",
        prevalence: "Rare in the general population",
        comment: `Thiamine responsive megaloblastic anemia syndrome (also known as RogersSyndrome) is a very rare autosomal recessive genetic disorder affecting a thiamine transporter, which is characterized by megaloblastic anemia. This syndrome is called "thiamine-responsive" because the anemia can be treated with high doses of vitamin B1 (thiamine).
        <br />
        https://doi.org/10.1007/s12185-010-0681-y
        https://pubmed.ncbi.nlm.nih.gov/20301459/
        https://doi.org/10.1007/s00246-002-0215-3
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `Normochromic normocytic anemia regularly develops in chronic renal failure when the glomerular filtration rate drops below 20-30 ml/min. The reasons include: 1) a moderately reduced red cell life span, 2) blood loss, and 3) an inadequate increase in erythropoiesis relative to the fall in hemoglobin (Hb).
        <br />
        https://pubmed.ncbi.nlm.nih.gov/10746799/#:~:text=Normochromic%20normocytic%20anemia%20regularly%20develops,fall%20in%20hemoglobin%20(Hb).
        https://www.ncbi.nlm.nih.gov/books/NBK539871/
        `,
        evidence: "Strong"
      },
      {
        condition: "Anemia of Inflammation",
        prevalance: "Common in people with chronic conditions such as cancer, certain infections, and autoimmune and inflammatory diseases such as rheumatoid arthritis or lupus",
        comment: `Anemia of inflammation (AI, also called anemia of chronic disease) is a common, typically normocytic normochromic anemia that is caused by an underlying inflammatory disease.
        <br />
        https://doi.org/10.1016/j.hoc.2014.04.005
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolytic anemia",
        prevalance: "Rare in the general population",
        comment: `Hemolytic anemia is a disorder in which red blood cells are destroyed faster than they can be made. Normocytic anemias may be thought of as representing any of the following: an increased destruction or loss of red blood cells (e.g., hemolysis, posthemorrhagic anemia); an uncompensated increase in plasma volume (e.g., pregnancy, fluid overload); a decreased production of normal-sized red blood cells or a mixture of conditions producing microcytic and macrocytic anemias.
        <br />
        https://www.aafp.org/afp/2000/1115/p2255.html
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin E deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin E deficiency in premature infants has been associated with hemolytic anemia. Anemia of prematurity (AOP) is a normocytic, normochromic, hyporegenerative anemia characterized by a low serum erythropoietin (EPO) level, often despite a remarkably reduced hemoglobin concentration. Vitamin E deficiency can cause hemolytic anemia because vitamin E protects the red blood cell membrane from oxidative damage.
        <br />
        http://dx.doi.org/10.1136/fn.88.4.F324
        https://doi.org/10.1136/adc.48.5.360
        https://doi.org/10.1055/s-0037-1607283
        `,
        evidence: "Strong"
      },
      {
        condition: "Magnesium deficiency",
        prevalance: "Rare in the general population",
        comment: `There is no evidence that magnesium deficiency is associated with normocytic anemia in humans.
        `,
        evidence: "Strong"
      },
      {
        condition: "Selenium deficiency",
        prevalance: "Rare in the general population",
        comment: `There is evidence that dietary selenium protects red blood cells from oxidative damage and that a lack of selenoprotein can lead to the hemolysis of red blood cells due to oxidative stress. Hemolytic anemia is a type of normocytic anemia characterized by increased destruction of red blood cells, or hemolysis.
        <br />
        https://onlinelibrary.wiley.com/doi/epdf/10.1002/fsn3.2261
        https://doi.org/10.1093/ajcn/31.1.46
        https://doi.org/10.1007/s12011-018-1483-y
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin C deficiency",
        prevalance: "Rare in the general population",
        comment: `Erythropoietic studies revealed a decrease in small lymphoid hemoblast with simultaneous increase in the later stages of red blood cell development.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/14823413/
        https://doi.org/10.1016/s0083-6729(08)60779-7
        https://doi.org/10.1111/j.1753-4887.1992.tb01304.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Oxidative stress",
        prevalance: "",
        comment: `Oxidative stress is a phenomenon caused by an imbalance between production and accumulation of oxygen reactive species (ROS) in cells and tissues and the ability of a biological system to detoxify these reactive products. When cells experience oxidative stress, ROS, which are generated in excess, may oxidize proteins, lipids and DNA - leading to cell death and organ damage. Oxidative stress is believed to aggravate the symptoms of many diseases, including hemolytic anemias.
        <br />
        https://doi.org/10.2174/156652408786241384
        https://pubmed.ncbi.nlm.nih.gov/10746801/
        `,
        evidence: "Strong"
      },
      {
        condition: "Iron deficiency",
        prevalance: "Common in the general population",
        comment: `Iron deficiency is the most common cause of microcytic anemia. Decreased iron reserves in the body may be due to decreased iron in the diet, poor absorption of iron from the gut, acute and chronic blood loss, increased demand of iron in certain situations like pregnancy or recovering from major trauma or surgery. Low iron in the body affects the production of hemoglobin which subsequently hinders the transport of oxygen to organ systems of the body.
        <br />
        https://doi.org/10.1016/s0025-7125(16)30339-x
        https://www.ncbi.nlm.nih.gov/books/NBK470252/
        https://doi.org/10.1016/s0025-7125(16)30339-x
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B6 deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin B6 deficiency causes microcytic hypochromic anemia, since B6 is necessary for erythrocytic hemopoiesis as a coenzyme for heme biosynthesis.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/16440762/
        https://www.ncbi.nlm.nih.gov/books/NBK470579/
        https://pubmed.ncbi.nlm.nih.gov/16440762/
        `,
        evidence: "Strong"
      },
      {
        condition: "Copper deficiency",
        prevalance: "Rare in the general population",
        comment: `Copper is essential for absorbing iron from the gut. When copper levels are low, the body may absorb less iron.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/1642210/
        https://doi.org/10.1080/20009666.2017.1351289
        https://doi.org/10.7759/cureus.3636
        `,
        evidence: "Strong"
      },
      {
        condition: "Zinc deficiency",
        prevalance: "Rare in the general population",
        comment: `There is little information on the link between zinc deficiency and microcytic anemia. Nevertheless, it is generally believed that since zinc is a catalyst for many enzymes that are needed for red blood cell production, zinc deficiency may be associated with anemia.
        <br />
        https://doi.org/10.4274/Tjh.2012.0145
        `,
        evidence: "Moderate"
      },
      {
        condition: "Vitamin A deficiency",
        prevalance: "Rare in the general population",
        comment: `Evidence from animal studies shows that vitamin A deficiency may be involved in microcytic anemia. Vitamin A deficiency is believed to be involved in the pathogenesis of anemia through diverse biological mechanisms, such as the enhancement of growth and differentiation of erythrocyte progenitor cells, potentiation of immunity to infection and reduction of the anemia of infection, and mobilization of iron stores from tissues.
        <br />
        https://doi.org/10.1093/jn/100.9.1033
        `,
        evidence: "Moderate"
      },
      {
        condition: "Vitamin C deficiency",
        prevalance: "Rare in the general population",
        comment: `Microcytic anemia may develop because vitamin C facilitates the absorption of iron and because of the bleeding manifestation of scurvy.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/14823413/
        `,
        evidence: "Strong"
      }
    ];
  }

  // Iron
  if (marker === 1082) {
    data.high = [
      {
        condition: "Alcoholism",
        prevalence: "Common in the general population",
        comment: `The reason why heavy alcohol consumption accentuates the clinical expression of hemochromatosis (iron build up) is unclear. Increased dietary iron or increased iron absorption is unlikely. The most likely explanation would seem to be the added co-factor effect of iron and alcohol, both of which cause oxidative stress, hepatic stellate cell activation, and hepatic fibrogenesis. In addition, the cumulative effects of other forms of liver injury may result when iron and alcohol are present concurrently.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/11505030/
        https://doi.org/10.1007/BF01316575
        https://doi.org/10.1016/s0741-8329(03)00128-9
        https://doi.org/10.1186/s13256-020-02610-7
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemosiderosis, hemochromatosis",
        prevalence: "Common in the general population",
        comment: `Hereditary hemochromatosis causes the body to absorb too much iron from food.
        <br />
        https://doi.org/10.1080/17474124.2018.149601
        https://www.ncbi.nlm.nih.gov/books/NBK430862/
        https://doi.org/10.1002/hep.24330
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolytic anemia",
        prevalence: "Rare in the general population",
        comment: `Hemolysis occurring in hematologic diseases is often associated with an iron loading anemia. This iron overload is the result of a massive outflow of hemoglobin into the bloodstream.
        <br />
        https://doi.org/10.1016/j.lpm.2017.10.007
        https://doi.org/10.3324/haematol.2016.151621
        https://doi.org/10.1016/j.freeradbiomed.2014.03.039
        `,
        evidence: "Strong"
      },
      {
        condition: "Sideroblastic Anemia",
        prevalence: "Rare in the general population",
        comment: `The sideroblastic anemias are a group of blood disorders in which the body has enough iron but is unable to use it to make hemoglobin, which carries oxygen in the blood. As a result, iron accumulates in the mitochondria of red blood cells.
        <br />
        https://doi.org/10.1016/j.hoc.2014.04.008
        https://doi.org/10.2147/JBM.S232644
        https://www.ncbi.nlm.nih.gov/books/NBK538287/
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B6 deficiency",
        prevalence: "Rare in the general population",
        comment: `Vitamin B6 (Pyridoxine) is needed for iron to convert into hemoglobin. If vitamin B6 is not available, iron build up may occur.
        <br />
        https://doi.org/10.1002/ajh.21416
        https://doi.org/10.1111/j.1753-4887.1966.tb08457.x
        https://doi.org/10.1136/gut.18.1.23
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver damage/disease",
        prevalence: "Common in the general population",
        comment: `There is evidence that patients with liver disease are much more likely to have iron overload, even in the absence of hemochromatosis.
        <br />
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5193089/
        https://www.ncbi.nlm.nih.gov/books/NBK430862/
        `,
        evidence: "Strong"
      },
      {
        condition: "Iron Poisoning",
        prevalence: "",
        comment: ``,
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Poor intake / Iron deficiency",
        prevalence: "Common in the general population",
        comment: `Low dietary iron causes abnormally low iron levels in the body.
        <br />
        https://doi.org/10.2147/IJGM.S17788
        https://doi.org/10.1079/PHN2002455
        https://www.ncbi.nlm.nih.gov/books/NBK448065/
        `,
        evidence: "Strong"
      },
      {
        condition: "Chronic disease and/or chronic infection",
        prevalence: "Common in the general population",
        comment: `Chronic infection or disease can cause anemia. Multiple factors are involved, including shortened red blood cell survival, impaired erythropoiesis, and impaired iron metabolism.
        <br />
        https://doi.org/10.1159/000452104
        https://doi.org/10.1111/nyas.14092
        https://doi.org/10.1016/j.hoc.2014.04.005
        `,
        evidence: "Strong"
      },
      {
        condition: "Chronic blood loss",
        prevalence: "Common in the general population",
        comment: `Blood loss means loss of iron. Women with heavy periods are at risk of iron deficiency anemia because they lose blood during menstruation. Slow, chronic blood loss within the body such as from a peptic ulcer, a hiatal hernia, a colon polyp or colorectal cancer can cause iron deficiency anemia.
        <br />
        https://doi.org/10.1016/j.mcna.2016.09.004
        https://www.ncbi.nlm.nih.gov/books/NBK448065/
        https://doi.org/10.1101/cshperspect.a011866
        `,
        evidence: "Strong"
      },
      {
        condition: "Progesterone birth control pills",
        prevalence: "Common in the general population",
        comment: `Some studies suggest that progesterone increases fluid levels, leading to dilution of iron indices such as hemoglobin.
        <br />
        https://doi.org/10.1002/ajpa.22907
        https://doi.org/10.1093/ajcn/81.5.1218
        `,
        evidence: "Moderate"
      },
      {
        condition: "Poor absorption",
        prevalence: "",
        comment: `Malabsorption of iron leads to decreased iron absorption and produces iron deficiency.
        <br />
        https://doi.org/10.12669/pjms.316.8125
        https://pubmed.ncbi.nlm.nih.gov/1271141/
        https://doi.org/10.1097/00005176-199201000-00005
        `,
        evidence: "Strong"
      }
    ];
  }

  // Transferrin/TIBC
  if (marker === 1836) {
    data.high = [
      {
        condition: "Iron deficiency",
        prevalence: "Common in the general population",
        comment: `The amount of transferrin in the blood indicates the amount of iron in the body. High transferrin signifies low iron, which means there is less iron bound to transferrin, allowing for a high circulation of non-bound iron transferrin in the body, revealing a possible iron deficiency anemia.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK559119/
        https://www.ncbi.nlm.nih.gov/books/NBK532928/
        https://doi.org/10.1093/ajcp/71.4.401
        `,
        evidence: "Strong"
      },
      {
        condition: "Pregnancy",
        prevalance: "Common in the general population",
        comment: `Transferrin is a protein that transports iron through the bloodstream. Maternal transferrin production steadily increases during pregnancy, which may function to increase iron delivery to the placenta.
        <br />
        https://doi.org/10.3945/ajcn.117.155812
        https://doi.org/10.1046/j.1365-2141.1998.01035.x
        https://doi.org/10.1373/clinchem.2014.23422
        `,
        evidence: "Strong"
      },
      {
        condition: "Elevated estrogen, oral contraceptives",
        prevalance: "Common in the general population",
        comment: `Studies show that estrogen induces transferrin gene expression through a non-consensus distal estrogen response elements (ERE).
        <br />
        https://pubmed.ncbi.nlm.nih.gov/9883381/
        https://pubmed.ncbi.nlm.nih.gov/3787224/
        https://doi.org/10.1677/jme.0.0290305
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Hemochromatosis/Hemosiderosis",
        prevalance: "Common in the general population",
        comment: `Low transferrin in plasma indicates iron overload, which means the binding site of transferrin is highly saturated with iron. Iron overload suggests hemochromatosis, which will lead to deposition of iron on tissues. In hemochromatosis, iron will be high and Total Iron-Binding Capacity will be low or normal, causing the transferrin saturation to increase.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/23418762/
        https://pubmed.ncbi.nlm.nih.gov/27683335/
        https://www.ncbi.nlm.nih.gov/books/NBK532928/
       `,
        evidence: "Strong"
      },
      {
        condition: "Liver dysfunction",
        prevalance: "Common in the general population",
        comment: `As transferrin is synthesized by the liver, liver damage may alter the rate of transferrin synthesis.
        <br />
        https://doi.org/10.1002/lt.24981
        https://doi.org/10.1111/liv.13211
        https://doi.org/10.1002/hep.1840050503
       `,
        evidence: "Strong"
      },
      {
        condition: "Chronic infection",
        prevalance: "Common in the general population",
        comment: `The trapping of iron in the cells of the reticulo-endothelial system, and the low serum iron consequently results in low transferrin saturation. The level of the transport protein transferrin is therefore increased in iron deficiency anaemia but reduced or normal in anaemia of chronic disease (ACD) or anaemia of chronic inflammation.
        <br />
        https://doi.org/10.1016/j.hoc.2014.04.005
        https://doi.org/10.1177%2F0004563216675185
        https://doi.org/10.1016/j.jpeds.2015.01.017
       `,
        evidence: "Strong"
      },
      {
        condition: "Anemia of Chronic Disease",
        prevalance: "Common in people with chronic conditions such as cancer, and autoimmune and inflammatory diseases such as rheumatoid arthritis or lupus.",
        comment: `The total iron-binding capacity (TIBC), an indirect measurement of transferrin, is low in anemia of chronic disease because there is ample iron, but it is not easily available.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK559119/
        https://doi.org/10.1016/j.cccn.2004.01.002
       `,
        evidence: "Strong"
      },
      {
        condition: "Hemolytic Anemia",
        prevalance: "Rare in the general population",
        comment: `Lower-than-normal TIBC may mean anemia due to red blood cells being destroyed too quickly (hemolytic anemia).
        <br />
        https://doi.org/10.1016/j.cccn.2004.01.002
        https://doi.org/10.2147/JBM.S29212
       `,
        evidence: "Strong"
      },
      {
        condition: "Sideroblastic Anemia",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Ferritin
  if (marker === 791) {
    data.high = [
      {
        condition: "Hemosiderosis, hemochromatosis",
        prevalence: "Common in the general population",
        comment: `Ferritin is a blood protein whose levels correlate with the amount of iron stored in the body. Blood ferritin levels usually are low in patients with iron deficiency anemia, and are high in patients with hemochromatosis and other conditions that cause an increase in body iron levels.
        <br />
        https://doi.org/10.1002/hep.24330
        https://doi.org/10.1016/j.cld.2014.09.011
        https://doi.org/10.1111/imj.13784
        `,
        evidence: "Strong"
      },
      {
        condition: "Inflammatory diseases/ Chronic Illness",
        prevalence: "Common in the general population",
        comment: `Serum ferritin is a well known inflammatory marker, but it is unclear whether serum ferritin reflects or causes inflammation, or whether it is involved in an inflammatory cycle. Nevertheles, it is believed that serum ferritin arises from damaged cells, and is thus a marker of cellular damage.
        <br />
        https://doi.org/10.1039/c3mt00347g
        https://doi.org/10.1093/intimm/dxx031
        https://doi.org/10.1186/ar4012
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver damage",
        prevalence: "Common in the general population",
        comment: `Ferritin is stored in many types of cells, including liver cells. With liver damage from any cause, ferritin is leaked into the blood. Therefore, serum ferritin can be an indirect measurement of liver necrosis.
        <br />
        https://doi.org/10.1002/hep.24706
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3093720/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolytic anemia, sideroblastic anemia",
        prevalence: "Both are rare in the general population",
        comment: `Ferritin is a universal intracellular protein that stores iron and releases it in a controlled fashion. Thus, chronic hemolysis may give rise to particularly high ferritin values.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/1697823/
        https://doi.org/10.1159/000207083
        https://doi.org/10.11406/rinketsu.59.401
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Iron Deficiency",
        prevalance: "Common in the general population",
        comment: `After the iron stores are depleted, plasma ferritin level and plasma transferrin saturation are also reduced.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK448065/
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4836595/
        https://doi.org/10.5152/tpa.2015.2337
        https://doi.org/10.7861/clinmedicine.18-3-242
       `,
        evidence: "Strong"
      },
      {
        condition: "Progesterone birth control pills",
        prevalance: "Common in the general population",
        comment: `A small body of literature suggests that serum ferritin, a better measure of total body iron stores, only drops during the first 1-12 months of oral contraceptive therapy. The initial drop in serum ferritin has been attributed to increased mobilization and utilization of iron as a result of increased erythropoiesis.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/12279891/
       `,
        evidence: "Moderate"
      },
      {
        condition: "Chronic disease and/or chronic infection",
        prevalance: "Common in the general population",
        comment: `There is no evidence to support this claim.`,
        evidence: "Weak"
      },
      {
        condition: "Poor iron absorption",
        prevalance: "",
        comment: `Disorders of iron malabsorption lead to decreased iron absorption and may produce iron deficiency anemia. Low level of iron in the blood means iron stores are depleted and ferritin levels also decrease.
        <br />
        https://doi.org/10.3748/wjg.15.4644
        https://pubmed.ncbi.nlm.nih.gov/8602626/
       `,
        evidence: "Strong"
      },
      {
        condition: "Poor iron intake",
        prevalance: "",
        comment: `Iron is loaded onto diferric transferrin from three sources: the gut (diet), macrophages (recycled iron), and the liver (stored ferritin iron). In general, iron stores are reduced or lost before the host develops anemia. Therefore, dietary and erythrocyte-recycled iron must meet the demands for erythrocyte production.
        <br />
        https://doi.org/10.1101/cshperspect.a011866
        https://www.ncbi.nlm.nih.gov/books/NBK448065/
       `,
        evidence: "Strong"
      },
      {
        condition: "Chronic blood loss",
        prevalance: "",
        comment: `Low levels of ferritin lead to iron-deficiency anemia. This means one has too few red blood cells. Iron deficiency can come from a poor diet or blood loss. Or the body may have trouble absorbing iron from food.
        <br />
        https://doi.org/10.1016/j.mcna.2016.09.004
        https://doi.org/10.1177/1756283X11398736
        https://www.ncbi.nlm.nih.gov/books/NBK448065/
       `,
        evidence: "Strong"
      }
    ];
  }

  // Reticulocyte Count
  if (marker === 1589) {
    data.high = [
      {
        condition: "Hemolytic anemia",
        prevalence: "Rare in the general population.",
        comment: `The reticulocyte count, a marker of effective erythropoiesis, is the single blood test most important for distinguishing hypoproliferative anemia from other causes such as blood loss or destruction. Reticulocytes are immature red blood cells (RBCs). In the process of erythropoiesis (red blood cell formation), reticulocytes develop and mature in the bone marrow and then circulate for about a day in the bloodstream before developing into mature red blood cells. A high reticulocyte percentage or count reflects a marrow that is attempting to compensate for red cell destruction, or recovering from anemia.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK542172/
        https://www.ncbi.nlm.nih.gov/books/NBK264/
        https://pubmed.ncbi.nlm.nih.gov/10865417/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolytic disease of the newborn",
        prevalence: "Rare in the general population.",
        comment: `Hemolytic disease of the newborn (HDN) is a blood disorder in fetus or newborn infants. In the disorder, red blood cells in the blood are destroyed quickly and thus do not last as long.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK560488/
        https://doi.org/10.1136/adc.2005.076794
        `,
        evidence: "Strong"
      },
      {
        condition: "Blood loss/Bleeding",
        prevalance: "",
        comment: `Just like in hemolytic anemia, a high reticulocyte percentage or count reflects a marrow that is recovering from blood loss.
        <br />
        https://doi.org/10.1097/TA.0b013e318187a848
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Excessive alcohol consumption can decrease reticulocyte counts, by causing liver disease and depleting nutrients needed for red blood cell production.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK264/
        https://pubmed.ncbi.nlm.nih.gov/8546042/
       `,
        evidence: "Strong"
      },
      {
        condition: "Endocrine disease",
        prevalance: "Common in the general population",
        comment: `A decreased reticulocyte count (reticulocytopenia) means that the bone marrow is not producing enough erythrocytes. This occurs in endocrine disorders.
        <br />
        https://journals.lww.com/nursingcriticalcare/fulltext/2020/09000/reticulocyte_count.7.aspx
       `,
        evidence: "Strong"
      },
      {
        condition: "Untreated nutrient deficiency anemia (Iron, B12)",
        prevalance: "Iron deficiency anemia is common while B12 deficiency anemia is rare in the general population",
        comment: `A low reticulocyte count may mean fewer red blood cells are being made by the bone marrow because of nutrient deficient anemia.
        <br />
        https://doi.org/10.5152/tpa.2015.2337
        https://doi.org/10.1001/jama.281.23.2225
        https://doi.org/10.1101/cshperspect.a011866
       `,
        evidence: "Strong"
      },
      {
        condition: "Anemia of chronic disease",
        prevalance: "Common in people with chronic conditions such as cancer, certain infections, and autoimmune and inflammatory diseases such as rheumatoid arthritis or lupus.",
        comment: `It is reported that marrow macrophages from patients with the anemia of chronic disease (ACD) significantly suppresses erythroid progenitor cell growth.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/2822178/
        https://doi.org/10.1159/000452104
        https://doi.org/10.7861/clinmedicine.13-2-193
       `,
        evidence: "Strong"
      },
      {
        condition: "Aplastic anemia",
        prevalance: "Rare in the general population.",
        comment: `People who have aplastic anemia have low reticulocyte levels because the bone marrow is not making red blood cells at the correct rate.
        <br />
        https://doi.org/10.7860/JCDR/2014/8949.4704
        https://doi.org/10.1053/j.seminhematol.2015.07.002
        https://doi.org/10.1002/jcla.1860070612
       `,
        evidence: "Strong"
      },
      {
        condition: "Radiation therapy",
        prevalance: "",
        comment: ``,
        evidence: ""
      },
      {
        condition: "Bone marrow failure caused by infection or cancer",
        prevalance: "",
        comment: ``,
        evidence: ""
      },
      {
        condition: "Severe kidney disease; this may cause a low level of erythropoietin",
        prevalance: "",
        comment: ``,
        evidence: ""
      }
    ];
  }

  // Osmolarity / Osmolality
  if (marker === 3008) {
    data.high = [
      {
        condition: "Diabetes, Increased blood glucose",
        prevalence: "Common in the general population",
        comment: `The term osmolarity refers to the number of particles of solute per liter of solution, whereas the term osmolality refers to the number of particles of solute per kilogram of solvent. Poorly controlled diabetes causes high levels of sugar in the blood.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/1293047/
        https://doi.org/10.2337/diab.24.6.594
        https://pubmed.ncbi.nlm.nih.gov/29431405/
        `,
        evidence: "Strong"
      },
      {
        condition: "Dehydration",
        prevalance: "Common in the general population",
        comment: `When there is less water in the blood, the concentration of particles is greater. Osmolality increases when one is dehydrated and decreases when one has too much fluid in the blood.
        <br />
        https://doi.org/10.1016/j.jand.2015.12.011
        https://www.ncbi.nlm.nih.gov/books/NBK567764/
        https://doi.org/10.1136/bmjopen-2015-008846
        `,
        evidence: "Strong"
      },
      {
        condition: "Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `Only low-molecular weight ions and uncharged molecules that are present in relatively high concentrations contribute significantly to serum osmolality. In some conditions such as in kidney dysfunction, there are a significant number of abnormal substances present, which contribute to the total osmolality.
        <br />
        https://doi.org/10.1159/000097604
        https://doi.org/10.3109/0886022X.2013.838052
        https://dx.doi.org/10.1371%2Fjournal.pone.0169137
        `,
        evidence: "Strong"
      },
      {
        condition: "Excessive ingestion of alcohol, methanol, ethylene glycol, isopropyl alcohol or aspirin (salicylates)",
        prevalance: "Excessive ingestion of alcohol is common in the general population.",
        comment: `The effect on osmolality is directly proportional to the serum concentration of the alcohol and inversely related to its molecular weight (MW). For instance, methanol (MW, 32.04 g/mol) increases serum osmolality twice as much as an equivalent concentration of ethylene glycol (MW, 62.07 g/mol).
        <br />
        https://doi.org/10.1093/alcalc/agq029
        https://www.atsjournals.org/doi/pdf/10.1513/AnnalsATS.201401-033CC
        `,
        evidence: "Strong"
      },
      {
        condition: "Increased blood sodium",
        prevalance: "",
        comment: `Regulation of osmolarity is achieved by balancing the intake and excretion of sodium with that of water. (Sodium is by far the major solute in extracellular fluids, so it effectively determines the osmolarity of extracellular fluids.)
        <br />
        https://doi.org/10.1371/journal.pone.0169137
        https://doi.org/10.5414/cn106617
        https://doi.org/10.1007/s11255-012-0353-3
        `,
        evidence: "Strong"
      },
      {
        condition: "Increased nitrogen waste products in the blood (uremia)",
        prevalance: "",
        comment: `Urea freely crosses cell membranes and distributes evenly in total body water (TBW), and therefore it changes osmolality but not tonicity. Thus except during early and rapid solute and water changes, urea is an ineffective osmol.
        <br />
        https://doi.org/10.1111/j.1525-1594.2011.01293.x
        https://doi.org/10.1016/j.jand.2015.12.011
        `,
        evidence: "Strong"
      },
      {
        condition: "Stroke or head trauma that leads to decreased antidiuretic hormone (ADH)",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Mannitol therapy--used in the treatment of brain swelling (cerebral edema)",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Shock",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Excess hydration",
        prevalance: "",
        comment: `Overhydration can result from excessive water (or fluid) intake with or without proper electrolyte replacement. The metabolic consequence of excess water retention is a dilution of the osmolality of body fluids, or hypoosmolality, and a commensurate dilution of the extracellular fluid (ECF) sodium concentration to low levels, or hyponatremia.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK537231/
        https://doi.org/10.14814/phy2.13356
        https://doi.org/10.1136/bjsm.2005.018481
       `,
        evidence: "Strong"
      },
      {
        condition: "Decreased blood sodium",
        prevalance: "",
        comment: `A low sodium concentration in the blood (Hyponatremia) with hypo-osmolality of serum is produced by retention of water, by loss of sodium or both. It is always maintained by a defect in excretion of free water.
        <br />
        https://doi.org/10.1016/0002-9149(63)90254-6
        https://www.ncbi.nlm.nih.gov/books/NBK470386/
       `,
        evidence: "Strong"
      },
      {
        condition: "Increased Antidiuretic hormone (ADH) secretion",
        prevalance: "",
        comment: `Antidiuretic hormone stimulates water reabsorption by stimulating insertion of "water channels'' or aquaporins into the membranes of kidney tubules. These channels transport solute-free water through tubular cells and back into blood, leading to a decrease in plasma osmolarity.
        <br />
        https://doi.org/10.2165/00002018-199512030-00006
        https://doi.org/10.1080/03655230410018318
       `,
        evidence: "Strong"
      }
    ];
  }

  // Sodium
  if (marker === 1695) {
    data.high = [
      {
        condition: "Dehydration",
        prevalence: "Common in the general population",
        comment: `Hypernatremia can occur when there is too much water loss or too much sodium gain in the body. The result is too little body water for the amount of total body sodium.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK441960/
        https://doi.org/10.1016/s0031-3955(16)36874-2
        https://doi.org/10.1097/00005176-198809000-00013
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperaldosterone",
        prevalance: "Hyperaldosteronism is common in hypertensive population.",
        comment: `Aldosterone, by inducing renal reabsorption of sodium at the distal convoluted tubule (DCT), enhances secretion of potassium and hydrogen ions, causing hypernatremia, hypokalemia, and alkalosis.
        <br />
        https://doi.org/10.1016/s0025-6196(12)61380-9
        https://doi.org/10.4061/2011/837817
        https://doi.org/10.1210/JC.2015-2007
        `,
        evidence: "Strong"
      },
      {
        condition: "Cushing syndrome",
        prevalance: "Rare in the general population.",
        comment: `Cortisol in a physiological concentration range is prevented from binding to mineralocorticoid receptors (MR) in the mineralocorticoid target tissues by the locally produced enzyme 11 -hydroxysteroid dehydrogenase (11 -HSD) type 2. However, excess cortisol levels like those in Cushing syndrome might exceed the capacity of enzyme 11 -hydroxysteroid dehydrogenase (11 -HSD) type 2. to inactivate the steroid to cortisone, thus making it available to bind to the mineralocorticoid receptors (MR) and mimic excess aldosterone. The ensuing mineralocorticoid receptors (MR) activation results in increased renal tubular sodium reabsorption and intravascular volume expansion.
        <br />
        https://doi.org/10.1161/HYPERTENSIONAHA.108.121640
        https://doi.org/10.1159/000314315
        `,
        evidence: "Strong"
      },
      {
        condition: "Diabetes insipidus, a condition caused by too little ADH",
        prevalance: "Rare in the general population",
        comment: `Free water loss is seen with central or nephrogenic diabetes insipidus (DI). Extreme dehydration can lead to hypernatremia due to low water retention.
        <br />
        https://doi.org/10.2215/CJN.12141018
        https://pubmed.ncbi.nlm.nih.gov/22630107/
        https://doi.org/10.12659/AJCR.910011
        `,
        evidence: "Strong"
      },
      {
        condition: "High sodium intake",
        prevalance: "",
        comment: `Eating too much salt can have a range of effects. In the short term, it may cause bloating, severe thirst, and a temporary rise in blood pressure. In severe cases, it may also lead to hypernatremia, which, if left untreated, can be fatal.
        <br />
        https://doi.org/10.5049/EBP.2016.14.2.27
        https://www.ncbi.nlm.nih.gov/books/NBK441960/
        https://doi.org/10.1111/j.1365-2796.2004.01411.x
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "High serum glucose (Hyperglycemia)",
        prevalance: "Common in the general population",
        comment: `Glucose is an osmotic active substance. Thus, in cases of marked hyperglycemia plasma osmolality (Posm) is increased leading to movement of water out of cells and subsequently to a reduction of serum sodium levels (dilutional hyponatremia).
        <br />
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC100882/
        https://www.longdom.org/open-access/hyponatremia-in-diabetes-mellitus-clues-to-diagnosis-and-treatment-2155-6156-1000560.pdf
        https://pubmed.ncbi.nlm.nih.gov/7039873/
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `The main mechanism for the development of hyponatremia in patients with chronic hypothyroidism is the decreased capacity of free water excretion due to elevated antidiuretic hormone levels, which are mainly attributed to the hypothyroidism-induced decrease in cardiac output.
        <br />
        https://doi.org/10.1530/EJE-16-0493
        https://doi.org/10.3390/jcm4010032
        https://doi.org/10.1001/archinte.138.5.820
       `,
        evidence: "Strong"
      },
      {
        condition: "Fluid loss (diarrhea, vomiting, excessive sweating)",
        prevalance: "Common in the general population",
        comment: `Chronic, severe vomiting or diarrhea and other causes of dehydration causes the body to lose electrolytes, such as sodium, and also increases ADH levels.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK470386/
        https://doi.org/10.1159/000493240
        https://doi.org/10.1136/pgmj.2006.056515
       `,
        evidence: "Strong"
      },
      {
        condition: "Use of diuretics",
        prevalance: "Common in the general population",
        comment: `Diuretics, also called water pills, help rid the body of salt (sodium) and water. Most of them help the kidneys release more sodium into the urine. The sodium takes with it water from the blood, decreasing the amount of fluid flowing through veins and arteries.
        <br />
        https://doi.org/10.1159/000013496
        https://doi.org/10.1016/j.jemermed.2014.09.054
        https://doi.org/10.1016/j.semnephrol.2011.09.010
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypocortisol secretion, Addison's disease",
        prevalance: "Rare in general population",
        comment: `Hyponatremia and metabolic acidosis are major symptoms of adrenocortical dysfunction such as occurs in Addison's disease. Hyponatremia is caused by insufficiency of both aldosterone and cortisol. Aldosterone insufficiency decreases sodium reabsorption in the collecting ducts of the kidney.
        <br />
        https://doi.org/10.1093/omcr/omv063
        https://doi.org/10.14740/jocmr2041w
        https://doi.org/10.1684/abc.2016.1212
       `,
        evidence: "Strong"
      },
      {
        condition: "Kidney diseases that cause protein loss (nephrotic syndrome)",
        prevalance: "Rare in general population",
        comment: `Hyponatraemia in the nephrotic syndrome is associated with severe hypoalbuminaemia (plasma albumin less than 20 g/L), when hypovolaemia may occur, which may lead to arginine vasopressin (AVP) secretion and water retention.
        <br />
        https://doi.org/10.1016/j.amjmed.2007.09.001
        https://doi.org/10.1016/S0002-9343(00)00622-7
       `,
        evidence: "Strong"
      },
      {
        condition: "Conditions that lead to too much anti-diuretic hormone (ADH)",
        prevalance: "",
        comment: `The syndrome of inappropriate secretion of antidiuretic hormone (SIADH) is a disorder of impaired water excretion caused by the inability to suppress the secretion of antidiuretic hormone (ADH). If water intake exceeds the reduced urine output, the ensuing water retention leads to the development of hyponatremia.
        <br />
        https://doi.org/10.1542/peds.2004-2376
        https://www.ncbi.nlm.nih.gov/books/NBK507777/
        https://doi.org/10.1507/endocrj1954.38.325
       `,
        evidence: "Strong"
      },
      {
        condition: "Drinking too much water as might occur during exercise",
        prevalance: "",
        comment: `Drinking excessive amounts of water can cause low sodium by overwhelming the kidneys' ability to excrete water. Because sodium is lost through sweat, drinking too much water during endurance activities, such as marathons and triathlons, can also dilute the sodium content of the blood.
        <br />
        https://doi.org/10.6065/apem.2013.18.2.95
        https://doi.org/10.1159/000357667
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1872071/
       `,
        evidence: "Strong"
      },
      {
        condition: "Excess fluid buildup in the body (edema) caused by cirrhosis, heart failure",
        prevalance: "",
        comment: `Hyponatremia is a frequent complication of advanced cirrhosis related to an impairment in the renal capacity to eliminate solute-free water that causes a retention of water that is disproportionate to the retention of sodium, thus causing a reduction in serum sodium concentration and hypo-osmolality.
        <br />
        In heart failure, one or both of the heart's lower chambers lose their ability to pump blood effectively. As a result, blood can back up in the legs, ankles and feet, causing edema.
        <br />
        https://doi.org/10.1002/hep.22418
        https://doi.org/10.14309/ajg.0000000000000786
        https://doi.org/10.1002/cld.790
       `,
        evidence: "Strong"
      },
      {
        condition: "Glycosuria",
        prevalance: "",
        comment: `Intravascular osmolar substance attracts water and thus results in hyponatremia (dilutional effect) with sodium decreasing by 1 to 2 mEq/L for every 100 mg/dL glucose. Once the hyperglycemia overrides the renal threshold, glycosuria with water loss and eventual total body water depletion occurs.
        <br />
        In the absence of diuretics or an osmotic diuresis, for example glucosuria, a normal kidney will respond to arterial underfilling by increasing tubular sodium reabsorption with a decrease in fractional excretion of sodium (FENa) to less than 1.
        <br />
        https://doi.org/10.12998/wjcc.v2.i10.488
        https://doi.org/10.1159/000509082
       `,
        evidence: "Strong"
      },
      {
        condition: "Ketonuria",
        prevalance: "",
        comment: `Retention of free water is the dominant factor reducing the serum sodium concentration in hyponatremia.
        <br />
        https://doi.org/10.1016/s0272-6386(12)80647-0
        https://doi.org/10.1093/ndtplus/sfp152
       `,
        evidence: "Strong"
      }
    ];
  }

  // Potassium
  if (marker === 1483) {
    data.high = [
      {
        condition: "Low Insulin or possibly insulin resistance",
        prevalence: "Common in the general population",
        comment: `Insulin shifts potassium into cells by stimulating the activity of Na+-H+ antiporter on cell membrane, promoting the entry of sodium into cells, which leads to activation of the Na+-K+ ATPase, causing an electrogenic influx of potassium. Intravenous insulin leads to a dose-dependent decline in serum potassium levels.
        <br />
        https://doi.org/10.1007/s11255-015-1001-5
        https://doi.org/10.1093/ckj/sfu049
        https://doi.org/10.1152/ajpendo.1980.238.5.E421
        `,
        evidence: "Strong"
      },
      {
        condition: "Diabetes",
        prevalance: "Common in the general population",
        comment: `Patients with diabetes often also have diminished kidney capacity to excrete potassium into urine. The combination of potassium shift out of cells and diminished urine potassium excretion causes hyperkalemia.
        <br />
        https://doi.org/10.1093/ndt/gfz206
        https://doi.org/10.1016/0891-6632(90)90057-c
        https://doi.org/10.1136/pgmj.71.839.551
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperglycemia",
        prevalance: "Common in the general population",
        comment: `Hypertonicity caused by hyperglycemia from glucose infusions can drive potassium out of the intracellular space, leading to hyperkalemia. Hyperkalemia may occur with continuous infusions or with boluses of hypertonic glucose.
        <br />
        https://doi.org/10.4097/kjae.2011.61.2.175
        https://doi.org/10.7326/0003-4819-84-4-426
        https://pubmed.ncbi.nlm.nih.gov/7006540/
        `,
        evidence: "Strong"
      },
      {
        condition: "Kidney disease/Renal failure",
        prevalance: "Common in the general population",
        comment: `Hyperkalemia is a frequent finding in patients with kidney disease. This increase in serum potassium levels is associated with decreased renal ion excretion, as well as the use of medications to reduce the progression of kidney disease or to control associated diseases such as diabetes mellitus and heart failure.
        <br />
        https://doi.org/10.1590/1806-9282.66.S1.31
        https://doi.org/10.1007/s40620-019-00617-y
        `,
        evidence: "Strong"
      },
      {
        condition: "Dehydration",
        prevalance: "Common in the general population",
        comment: `When the body doesn't have enough fluids, it can't process potassium properly, and potassium builds up in the blood, which can lead to hyperkalemia.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/16445274/
        https://pubmed.ncbi.nlm.nih.gov/8214847/
        https://pubmed.ncbi.nlm.nih.gov/20403274/
        `,
        evidence: "Strong"
      },
      {
        condition: "Common drugs such as ACEI (used in diabetes and high blood pressure), NSAIDs (anti inflammatory)",
        prevalance: "The use of these drugs is common in the general population.",
        comment: `Preponderant use of angiotensin converting enzyme inhibitor (ACEI) and angiotensin receptor blocker (ARB) in the management of diabetes mellitus (DM) as a renoprotective drug escallates the incidence of hyperkalemia. Antihypertensive medications, Renin-angiotensin-aldosterone system (RAAS) inhibitors such as angiotensin converting enzyme inhibitors (ACEIs), angiotensin receptor blockers (ARBs), and aldosterone antagonists can increase the risk of hyperkalemia. NSAIDs like ibuprofen (Motrin, Advil) and naproxen (Aleve) may also raise potassium levels by causing the kidneys to hold onto potassium.
        <br />
        https://doi.org/10.1007/s11606-009-1228-x
        https://doi.org/10.1053/j.ajkd.2012.02.328
        https://doi.org/10.1161/HYPERTENSIONAHA.116.07363
        https://doi.org/10.1111/j.1524-6175.2006.05139.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Hypoaldosterone/Addison disease",
        prevalance: "Rare in general population",
        comment: `Hyperkalemia in Addison's disease is mediated mainly by hypoaldosteronism, and thus a deficiency of aldosterone will result in potassium retention, through its inability to excrete potassium in the urine.
        <br />
        https://doi.org/10.1186/s13256-021-02724-6
        https://doi.org/10.1038/ki.1980.14
        https://doi.org/10.1136/bcr-2015-213375
        `,
        evidence: "Strong"
      },
      {
        condition: "Exercise",
        prevalance: "",
        comment: `A progressive hyperkalemia is observed as exercise intensity increases. The current most popular hypothesis for hyperkalemia is that the Na+-K+ pump cannot keep pace with the K+ efflux from muscle during the depolarization-repolarization process of the sarcolemmal membrane during muscle contraction.
        <br />
        https://doi.org/10.1152/jappl.1997.83.2.631
        https://doi.org/10.1161/01.cir.89.3.1144
        https://doi.org/10.1113/jphysiol.1990.sp017935
        `,
        evidence: "Strong"
      },
      {
        condition: "Consuming too much potassium (e.g., diets high in potassium, potassium supplements)",
        prevalance: "",
        comment: `Potassium rich foods usually cause hyperkalemia in patients with underlying medical conditions such as diabetes mellitus and renal insufficiency.
        <br />
        https://doi.org/10.1016/j.psym.2011.01.011
        https://www.ncbi.nlm.nih.gov/pubmed/11323046
        https://www.ncbi.nlm.nih.gov/pubmed/16083995
        `,
        evidence: "Strong"
      },
      {
        condition: "Functional acidosis",
        prevalance: "",
        comment: `Acidemia will tend to shift K+ out of cells and cause hyperkalemia, but this effect is less pronounced in organic acidosis than in mineral acidosis. On the other hand, hypertonicity in the absence of insulin will promote K+ release into the extracellular space.
        <br />
        https://doi.org/10.1681/ASN.2011040414
        https://www.ncbi.nlm.nih.gov/books/NBK470284/
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3738601/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolysis",
        prevalance: "",
        comment: `Red-cell potassium concentration is so much higher than that of plasma (approximately 20 times higher); hemolysis causes a spuriously high plasma potassium concentration.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK470284/
        https://doi.org/10.1016/j.ajem.2005.05.011
        `,
        evidence: "Strong"
      },
      {
        condition: "Treatment with intravenous (IV) fluids, excessive IV potassium",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Injury to tissue",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Infections",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Diabetes",
        prevalance: "Common in the general population",
        comment: `The causes of hypokalemia in diabetes include: redistribution of potassium [K+] from the extracellular to the intracellular fluid compartment (shift hypokalemia due to insulin administration); gastrointestinal loss of K+ due to malabsorption syndromes (diabetic-induced motility disorders, bacterial overgrowth, chronic diarrheal states); and renal loss of K+ (due to osmotic diuresis and/or coexistent hypomagnesemia).
        <br />
        https://doi.org/10.12998/wjcc.v2.i10.488
        https://doi.org/10.4158/EP.11.5.331
        https://doi.org/10.1007/s11606-020-05799-x
       `,
        evidence: "Strong"
      },
      {
        condition: "Elevated insulin",
        prevalance: "Common in the general population",
        comment: `Insulin shifts potassium into cells by stimulating the activity of Na+-H+ antiporter on cell membrane, promoting the entry of sodium into cells, which leads to activation of the Na+-K+ ATPase, causing an electrogenic influx of potassium. IV insulin leads to a dose-dependent decline in serum potassium levels.
        <br />
        https://doi.org/10.1093/ckj/sfu049
        https://doi.org/10.12998/wjcc.v2.i10.488
       `,
        evidence: "Strong"
      },
      {
        condition: "Diarrhea and vomiting",
        prevalance: "Common in the general population",
        comment: `Fluid loss through diarrhea commonly causes dehydration and hypovolemia which activates Renin-Angiotensin-Aldosterone System (RAAS). This results in secretion of aldosterone by the adrenal glands which exacerbates potassium loss both through the kidneys via urine (in exchange for sodium) and through colonic secretion.
        <br />
        Vomiting leads to hypokalemia via a complex pathogenesis. Gastric fluid itself contains little potassium, approximately 10 mEq/L. However, vomiting produces volume depletion and metabolic alkalosis, which are accompanied by increased renal potassium excretion.
        <br />
        https://doi.org/10.1530/EC-18-0109
        https://www.ncbi.nlm.nih.gov/books/NBK482465/
        https://doi.org/10.1053/j.gastro.2011.01.065
       `,
        evidence: "Strong"
      },
      {
        condition: "Primary hyperaldosteronis m (Conn syndrome)",
        prevalance: "Common in hypertensive populations",
        comment: `Usually, aldosterone balances sodium and potassium in the blood. But too much of this hormone can cause potassium loss and sodium retention.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK470339/
        https://doi.org/10.3892/etm.2016.3864
        https://doi.org/10.1210/jc.2008-0104
       `,
        evidence: "Strong"
      },
      {
        condition: "As a side-effect of water pills (potassium-wasting diuretics)",
        prevalance: "Common in hypertensive populations",
        comment: `Diuretics are commonly used to treat hypertension. They lower blood pressure by helping the body eliminate sodium and water through urine. However, some diuretics can also cause elimination of more potassium in urine. This can lead to low potassium levels in the blood (hypokalemia).
        <br />
        https://pubmed.ncbi.nlm.nih.gov/8199766/
        https://doi.org/10.1530/EC-18-0109
        https://doi.org/10.1016/s0002-9343(84)80004-2
       `,
        evidence: "Strong"
      },
      {
        condition: "Poor potassium intake",
        prevalance: "",
        comment: `Hypokalemia is rarely caused by low dietary potassium intake alone, but it can result from diarrhea due to potassium losses in the stool. It can also result from vomiting, which produces metabolic alkalosis, leading to potassium losses in the kidneys. Hypokalemia can also be caused by refeeding syndrome.
        <br />
        https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/
       `,
        evidence: "Weak"
      },
      {
        condition: "Alkalosis",
        prevalance: "",
        comment: `Acidosis causes potassium to move from cells to extracellular fluid (plasma) in exchange for hydrogen ions, and alkalosis causes the reverse movement of potassium and hydrogen ions.
        <br />
        https://doi.org/10.1080/17843286.2018.1539373
        https://www.ncbi.nlm.nih.gov/books/NBK545269/
       `,
        evidence: "Strong"
      },
      {
        condition: "Low magnesium (Hypomagnesemia)",
        prevalance: "",
        comment: `Hypomagnesemia can cause hypokalemia possibly because a low intracellular magnesium [Mg2+] concentration activates the renal outer medullary K+ channel to secrete more K+.
        <br />
        https://doi.org/10.1681/ASN.2010060617
        https://doi.org/10.1681/ASN.2007070792
        https://pubmed.ncbi.nlm.nih.gov/9252977/
       `,
        evidence: "Strong"
      },
      {
        condition: "Increased catecholamine",
        prevalance: "",
        comment: `The β agonism contributes to the rise in blood glucose level by increasing glucagon and ACTH secretion (cortisol decreases tissue uptake of glucose) and lipolysis. The β2 agonism increases cellular potassium uptake, which reduces plasma potassium concentration.
        <br />
        https://doi.org/10.1111/j.1472-8206.1993.tb00228.x
        https://doi.org/10.1056/NEJM198503283121304
       `,
        evidence: "Strong"
      },
      {
        condition: "Elevated estrogen",
        prevalance: "",
        comment: `There is evidence in animal studies investigating the role of female sex steroids in the regulation of plasma electrolyte concentrations that 17β-estradiol (E2) increases plasma [Na+] and reduces plasma [K+].
        <br />
        https://doi.org/10.1016/s1550-8579(06)80193-2
       `,
        evidence: "Moderate"
      },
      {
        condition: "A complication of acetaminophen overdose",
        prevalance: "",
        comment: `Acetaminophen alters the renal handling of electrolytes observed by sodium retention, an increase in serum osmolality, hypokalemia and an increase in the urinary excretion of sodium, potassium and phosphate.
        <br />
        https://doi.org/10.1111/j.1742-7843.2007.00176.x
        https://doi.org/10.1177%2F0960327110361759
       `,
        evidence: "Strong"
      },
      {
        condition: "Drugs such as corticosteroids, beta-adrenergic agonists such as isoproterenol, alpha-adrenergic antagonists such as clonidine, antibiotics such as gentamicin and carbenicillin, and the antifungal agent amphotericin B",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Aspartate Aminotransferase (AST)
  if (marker === 301) {
    data.high = [
      {
        condition: "Alcoholism or Liver cirrhosis",
        prevalence: "Common in the general population",
        comment: `An elevated serum AST in relation to serum ALT (alanine aminotransferase) has been proposed as an indicator that alcohol has induced organ damage. Thus, when AST/ALT ratio is >1.5, this is considered as highly suggestive that alcohol is the cause of the patient's liver injury. The reasons for a classical 2:1 excess of serum AST activity compared to serum ALT activity in alcoholics have been attributed to (i) decreased ALT activity, most likely due to B6 depletion in the livers of alcoholics and/or (ii) mitochondrial damage leading to increased release of mAST in serum.
        <br />
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3866949/
        https://doi.org/10.15288/jsad.2010.71.249
        https://doi.org/10.1093/alcalc/agh074
        `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `Thyroid disorder might cause significant effect on metabolism of various cells including hepatocytes reflected by increase in biochemical parameters of liver function test, Aspartate Aminotransferase (AST)
        <br />
        https://www.ijcmr.com/uploads/7/7/4/6/77464738/ijcmr_2672.pdf
        https://doi.org/10.1515/jpem-2020-0031
        `,
        evidence: "Strong"
      },
      {
        condition: "Hepatitis",
        prevalance: "Common in the general population",
        comment: `Elevated liver enzymes often indicate inflammation or damage to cells in the liver. Inflamed or injured liver cells leak higher than normal amounts of certain chemicals, including liver enzymes, into the bloodstream, elevating liver enzymes on blood tests. The ratio of the serum aspartate to alanine amino-transferase levels (AST/ALT) is often used as a clue to the etiology of the underlying liver disease. This ratio is usually greater than 2.0 in alcoholic liver disease and less than 1.0 in patients with chronic hepatitis and chronic cholestatic syndromes.
        <br />
        https://doi.org/10.1016/s0016-5085(88)80022-2
        https://doi.org/10.1001/archinte.163.2.218
        https://www.ncbi.nlm.nih.gov/books/NBK482489/
        `,
        evidence: "Strong"
      },
      {
        condition: "Muscle injury",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Heart attack",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Vitamin B6 deficiency",
        prevalance: "Rare in the general population",
        comment: `Low Aspartate Aminotransferase activity in Vitamin B6 deficiency is because vitamin B6 serves as a coenzyme for the transaminase.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/7554526/
        https://pubmed.ncbi.nlm.nih.gov/675385/
        https://doi.org/10.1016/S0016-5085(84)80110-9
       `,
        evidence: "Strong"
      },
      {
        condition: "Azotemia (high nitrogen in the serum)",
        prevalance: "",
        comment: `Nitrogen‐containing compounds such as urea, uric acid, creatinine, etc may cause low AST levels. The explanation for this phenomenon is not known.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/4412711/
        https://doi.org/10.7326/0003-4819-84-3-275
       `,
        evidence: ""
      }
    ];
  }

  // Alanine transaminase (ALT)
  if (marker === 224) {
    data.high = [
      {
        condition: "Alcohol abuse",
        prevalence: "Common in general population",
        comment: `Alcohol intake is associated with increased hepatic enzyme activities.
        <br />
        https://doi.org/10.1093/alcalc/agn099
        https://doi.org/10.15288/jsad.2010.71.249
        https://doi.org/10.1001/jamanetworkopen.2019.5844
        `,
        evidence: "Strong"
      },
      {
        condition: "Cirrhosis",
        prevalance: "Common in general population",
        comment: `High levels of Alanine transaminase (ALT) can mean that the liver is leaking these enzymes because it's damaged from cirrhosis.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK559278/
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3609680/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hepatocellular disease",
        prevalance: "Common in general population",
        comment: `Alanine aminotransferase (ALT) is an enzyme found inside liver cells. Liver enzymes, including ALT, help the liver break down proteins to make them easier for the body to absorb. When the liver is damaged or inflamed, it can release ALT into the bloodstream. This causes ALT levels to rise.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK425/
        https://doi.org/10.17179/excli2016-800
        `,
        evidence: "Strong"
      },
      {
        condition: "Biliary issues / obstruction of bile ducts",
        prevalance: "Common in general population",
        comment: `In ‘cholestatic’ diseases, where bile flow is obstructed due to anatomic obstructions to bile duct flow (extrahepatic cholestasis) or impairment of bile synthesis by the hepatocytes (intrahepatic cholestasis), raised conjugated bilirubin levels are thought to be associated with a far greater elevation of alkaline phosphatase (ALP) than of serum transaminases.
        <br />
        https://doi.org/10.1093/qjmed/hci004
        https://doi.org/10.14218/JCTH.2017.00027
        https://doi.org/10.1136/bmj.322.7277.33
        `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatitis",
        prevalance: "Rare in the general population",
        comment: `Elevated liver enzymes in the setting of acute pancreatitis point toward choledocholithiasis as the cause, with an alanine aminotransferase greater than three times the upper limit of normal having a positive predictive value of 95% for gallstone pancreatitis.
        <br />
        https://doi.org/10.1385/IJGC:25:2:107
        https://doi.org/10.1007/s00268-012-1801-z
        https://doi.org/10.5402/2011/279607
        `,
        evidence: "Strong"
      },
      {
        condition: "Heart damage",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Vitamin B6 deficiency",
        prevalance: "Rare in the general population.",
        comment: `Low Alanine transaminase (ALT) activity in Vitamin B6 deficiency is because vitamin B6 serves as a coenzyme for the transaminase.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/25856859/
        https://pubmed.ncbi.nlm.nih.gov/7554526/
        https://doi.org/10.1111/j.1442-200X.2009.02813.x
       `,
        evidence: "Strong"
      },
      {
        condition: "Azotemia (high nitrogen in the serum)",
        prevalance: "",
        comment: `There is evidence that aspartate aminotransferase and alanine aminotransferase serum levels are negatively correlated with creatinine levels and directly correlated with glomerular filtration rate.
        <br />
        https://doi.org/10.6061/clinics/2015(05)07
       `,
        evidence: "Strong"
      }
    ];
  }

  // Alkaline Phosphatase
  if (marker === 170) {
    data.high = [
      {
        condition: "Gastrointestinal issues (ulcerative colitis, peptic ulcer)",
        prevalence: "Common in the general population",
        comment: `Increased activity of intestinal alkaline phosphatase (AP) occurs locally in patients with ulcerative colitis (UC), aimed at repairing inflammatory tissue damage. In addition, a positive correlation has been found between increasing severity of gastritis and increasing activity of alkaline phosphatase. For this reason, one of the chief criteria of gastritis is the presence of a metaplastic cell that has been shown to have a very high alkaline phosphatase activity.
        <br />
        https://doi.org/10.1002/ibd.21161
        https://doi.org/10.1155/2017/9074601
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver disease such as hepatitis, Liver or biliary cirrhosis",
        prevalence: "Common in the general population",
        comment: `Serum alkaline phosphatase (ALP) is a representative marker of cholestasis, in diseases such as primary biliary cirrhosis (PBC). High ALP usually means that either the liver has been damaged or a condition causing increased bone cell activity is present.
        <br />
        https://doi.org/10.1016/j.hepres.2006.01.009
        https://www.ncbi.nlm.nih.gov/books/NBK459201/
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperphosphatemia or high parathyroid hormone",
        prevalence: "Hyperparathyroidism is rare in the general population",
        comment: `Alkaline Phosphatase (ALP) is involved in bone formation and skeletal mineralization. Parathyroid hormone (PTH) stimulates osteoblast activity and thus increases the level of ALP in blood.
        <br />
        https://doi.org/10.1503/cmaj.090675
        https://doi.org/10.1016/j.jocd.2012.11.004
        https://doi.org/10.3109/00365599109107953
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver / bile duct obstruction (bile ducts are blocked usually by gallstones, scars from previous gallstones or surgery, or by cancers)",
        prevalence: "",
        comment: `Bile duct obstruction results in increased synthesis of ALP by bile duct epithelial cells and release of ALP into the serum. Alkaline phosphatase may be increased even if only a few small bile ducts are obstructed, and serum bilirubin is normal.
        <br />
        https://doi.org/10.1016/0009-8981(80)90417-9
        https://www.ncbi.nlm.nih.gov/books/NBK459201/
        `,
        evidence: "Strong"
      },
      {
        condition: "Bone disorders such as Paget disease",
        prevalence: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `It is believed that decreased serum alkaline phosphatase activity in hypothyroidism has a possible relationship to low serum zinc and magnesium. Zinc and magnesium are important co-factors of this enzyme.
        <br />
        https://doi.org/10.1093/clinchem/28.7.1711
        https://www.ncbi.nlm.nih.gov/books/NBK459201/
       `,
        evidence: "Strong"
      },
      {
        condition: "Zinc deficiency",
        prevalance: "Rare in the general population",
        comment: `Zinc takes part in the metabolism of bone as a constituent of the matrix and as an activator of several metallo-enzymes.
        <br />
        https://doi.org/10.1016/S0946-672X(01)80063-8
        https://doi.org/10.4162/nrp.2007.1.2.113
        https://doi.org/10.1177/156482651303400203
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin C deficiency",
        prevalance: "Rare in the general population",
        comment: `
        https://doi.org/10.1006/abbi.1996.0535
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1272960/
        https://doi.org/10.1111/j.1365-2613.2012.00820.x
       `,
        evidence: "Strong"
      },
      {
        condition: "Magnesium deficiency",
        prevalance: "Rare in the general population",
        comment: `Magnesium is an important co-factor of Alkaline Phosphatase (ALP).
        <br />
        https://pubmed.ncbi.nlm.nih.gov/7720239/
        https://doi.org/10.1159/000469414
        https://www.ncbi.nlm.nih.gov/books/NBK459201/
       `,
        evidence: "Strong"
      },
      {
        condition: "Hypophosphatasia",
        prevalance: "Rare in the general population",
        comment: `Low serum levels of alkaline phosphatase (ALP) are a hallmark of hypophosphatasia. Hypophosphatasia (HPP) is an inborn error of metabolism with highly variable clinical severity caused by loss-of-function mutations in the gene encoding tissue nonspecific alkaline phosphatase (TNSALP).
        <br />
        https://doi.org/10.1016/j.ejim.2015.12.019
        https://doi.org/10.1016/j.clinbiochem.2018.06.018
        https://doi.org/10.1016/j.jpeds.2016.01.045
       `,
        evidence: "Strong"
      },
      {
        condition: "Malnutrition",
        prevalance: "",
        comment: `High incidence of low protein intake are contributory factors for the low enzyme activity of Alkaline Phosphatase (ALP).
        <br />
        https://pubmed.ncbi.nlm.nih.gov/7720239/
        https://www.alliedacademies.org/articles/estimation-of-serum-zinc-and-alkaline-phosphatase-in-malnourished-children.pdf
       `,
        evidence: "Strong"
      }
    ];
  }

  // Creatinine
  if (marker === 611) {
    data.high = [
      {
        condition: "Complications of diabetes",
        prevalence: "Common in diabetic population",
        comment: `A creatinine test is a measure of how well kidneys are performing their job of filtering waste from the blood. Diabetic nephropathy is a common complication of type 1 and type 2 diabetes. Over time, poorly controlled diabetes can cause damage to blood vessel clusters in the kidneys that filter waste from the blood. This can lead to kidney damage and cause high blood pressure. As the kidneys fail, blood urea nitrogen (BUN) levels will rise as well as the level of creatinine in the blood.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/19414942/
        https://doi.org/10.5414/cnp67293
        https://doi.org/10.1186/s13098-019-0403-4
        `,
        evidence: "Strong"
      },
      {
        condition: "Kidney dysfunction",
        prevalence: "Common in the general population",
        comment: `Elevated creatinine level signifies impaired kidney function or kidney disease. As the kidneys become impaired for any reason, the creatinine level in the blood will rise due to poor clearance of creatinine by the kidneys. Abnormally high levels of creatinine thus warn of possible malfunction or failure of the kidneys.
        <br />
        https://doi.org/10.1542/peds.2019-2828
        https://www.ncbi.nlm.nih.gov/books/NBK507821/
        https://www.ncbi.nlm.nih.gov/books/NBK544228/
        `,
        evidence: "Strong"
      },
      {
        condition: "High meat intake",
        prevalance: "High meat intake is common in the general population",
        comment: `Habitual increase in protein intake leads to increased total muscle mass and the total body pool of creatinine, but acute ingestion of cooked meat causes a transient increase in serum and urinary creatinine. Cooking meat converts creatine in skeletal muscle to creatinine.
        <br />
        https://doi.org/10.2337/dc13-1770
        https://doi.org/10.14740/jocmr2738w
        https://doi.org/10.1111/j.1365-2125.1983.tb01490.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperthyroidism",
        prevalance: "Common in general population",
        comment: `Contrary to the claim, there is evidence that hyperthyroidism is characterized by an increase in renal plasma flow and glomerular filtration rate (GFR), resulting in a reduction of serum creatinine levels. The reduction of serum creatinine has also been reported in sub-clinical hyperthyroidism.
        `,
        evidence: "Weak"
      },
      {
        condition: "Atherosclerosis",
        prevalance: "Common in the general population",
        comment: `Elevated serum creatinine level could be a sensitive indicator of an early nephrovasculopathy, which correlates with early development of atherosclerosis and its precursor conditions.
        <br />
        https://doi.org/10.1081/jdi-100101965
        https://journals.lww.com/jhypertension/Abstract/2015/06001/PP_13_14__ASSOCIATION_BETWEEN_BLOOD_CREATININE.736.aspx
        https://doi.org/10.1038/sj.jhh.1001878
        `,
        evidence: "Strong"
      },
      {
        condition: "Dehydration",
        prevalance: "Common in the general population",
        comment: `Severe dehydration is a risk factor for kidney injury, which will affect creatinine levels. Dehydration is known to reduce blood flow to the kidneys and elevates creatinine and Blood urea nitrogen (BUN) levels in the blood.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/26411719/
        https://doi.org/10.1186/s12882-020-01804-x
        https://doi.org/10.1007/s00431-018-3087-0
        `,
        evidence: "Strong"
      },
      {
        condition: "Ketones",
        prevalance: "Common in people with diabetes",
        comment: `Diabetic ketoacidosis (DKA) is a problem that can happen in people with diabetes if their body starts to run out of insulin. When this happens, harmful substances called ketones build up in the body. In diabetic ketoacidosis (DKA), the plasma creatinine concentration can be elevated due to three causes. First, diabetic patients may have an elevated plasma creatinine due to the presence of diabetic nephropathy. Second, dehydration may develop in the course of DKA because of osmotic diuresis of glucose and ketoacids. Finally, interference of ketoacids with the plasma creatinine assay can result in a falsely high plasma creatinine concentration .
        <br />
        https://doi.org/10.1111/j.1365-2796.2000.00768.x
        https://doi.org/10.1016/0009-8981(67)90156-8
        https://doi.org/10.1016/s0009-9120(78)90028-0
        `,
        evidence: "Strong"
      },
      {
        condition: "Increased muscle mass",
        prevalance: "",
        comment: `Creatinine is produced in muscle by the nonenzymatic conversion of creatine and phosphocreatinine. The creatinine generated is proportional to muscle mass and is relatively constant. A significant increase in muscle mass would be expected to increase serum creatinine.
        <br />
        https://doi.org/10.7812/tpp/11-121
        https://doi.org/10.21037/jtd.2016.03.62
        https://doi.org/10.1136/bjsm.2006.026658
        `,
        evidence: "Strong"
      },
      {
        condition: "Prostate disease or kidney stone",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Shock",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Congestive heart failure",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Glomerulonephriti caused by, for example, infection or autoimmune diseases",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Bacterial infection of the kidneys (pyelonephritis)",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Tubular necrosis caused by, for example, drugs or toxins",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Decreased muscle mass",
        prevalance: "",
        comment: `Levels of creatinine are often linked with muscle mass or the amount of muscle in the body, which can decrease with age or illness. Low levels may indicate that muscles are less strong or are deteriorating, for example with a disease such as muscular dystrophy (MD).
        <br />
        https://doi.org/10.21037/jtd.2016.03.62
        https://doi.org/10.21037/jtd.2016.05.36
        https://doi.org/10.3389/fneur.2017.00196
       `,
        evidence: "Strong"
      },
      {
        condition: "Poor dietary protein intake or absorption",
        prevalance: "",
        comment: `Dietary protein intake significantly affects the serum creatinine concentration. Dietary protein consumption increases serum creatinine level through protein catabolism rather than decreased clearance.
        <br />
        https://doi.org/10.1053/j.ajkd.2012.10.017
        https://doi.org/10.1046/j.1523-1755.2002.00342.x
        https://doi.org/10.1136/bmj.1.6170.1049
       `,
        evidence: "Strong"
      }
    ];
  }

  // Blood Urea Nitrogen (BUN)
  if (marker === 378) {
    data.high = [
      {
        condition: "Dehydration",
        prevalance: "Common in the general population",
        comment: `Dehydrated patients usually present with elevated blood urea nitrogen (BUN) concentrations, reflecting a low urine flow rate and increased renal reabsorption of urea. This increased renal reabsorption of urea is thought to owe at least in part to the action of antidiuretic hormone (ADH).
        <br />
        https://doi.org/10.1111/j.1365-2842.2007.01732.x
        https://pubmed.ncbi.nlm.nih.gov/2075636/
        https://doi.org/10.1093/qjmed/hcm110
        `,
        evidence: "Strong"
      },
      {
        condition: "Kidney Disease",
        prevalance: "Common in the general population",
        comment: `If the kidneys are not able to remove urea from the blood normally, the BUN level rises. For this reason, a BUN test is carried out to see how well the kidneys are working.
        <br />
        https://doi.org/10.1186/s12882-019-1306-1
        https://www.ncbi.nlm.nih.gov/books/NBK305/
        `,
        evidence: "Strong"
      },
      {
        condition: "Fatty Liver disease",
        prevalance: "Common in the general population",
        comment: `Even though the mechanism is unknown, there is evidence that blood urea nitrogen is elevated in patients with non-alcoholic fatty liver disease.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/23858556/
        `,
        evidence: "Strong"
      },
      {
        condition: "Severe burns",
        prevalance: "Common in the general population",
        comment: `Acute renal failure is one of the major complications of burns. If the kidneys are not able to remove urea from the blood normally, the BUN level rises.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/19587506/
        https://doi.org/10.1093/jbcr/irz065
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3741001/
        `,
        evidence: "Strong"
      },
      {
        condition: "High protein diet",
        prevalance: "Common in the general population",
        comment: `Increased consumption of dietary protein is linearly related to the production of urea.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/9622580/
        https://doi.org/10.1016/j.jfms.2011.05.019
        https://doi.org/10.1093/jn/130.4.761
        `,
        evidence: "Strong"
      },
      {
        condition: "Catabolic states",
        prevalance: "",
        comment: `In a catabolic state, there is breaking down or loss of overall mass, both fat and muscle. High catabolic states are associated with greater urea nitrogen production, and rises in daily blood urea nitrogen (BUN) concentration.
        <br />
        https://doi.org/10.1038/s41598-017-14205-2
        https://doi.org/10.1023/a:1021346401701
        https://doi.org/10.1111/tri.13635
        `,
        evidence: "Strong"
      },
      {
        condition: "Congestive heart failure",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Shock",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Stress",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Recent heart attack",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Severe liver disease",
        prevalance: "Common in the general population",
        comment: `Decreases in urea synthesis in liver disease result in the accumulation of ammonia. The causes of the decrease in urea synthesis include decreases in the enzymes and substrates of the urea cycle, alterations in portal blood flow, and a decrease in total hepatic mass.
        <br />
        https://doi.org/10.1146/annurev.nu.02.070182.000321
        https://doi.org/10.1371/journal.pone.0158388
       `,
        evidence: "Strong"
      },
      {
        condition: "Possible B6 deficiency",
        prevalance: "Rare in the general population",
        comment: `There is no evidence to support or reject the claim.`,
        evidence: "Weak"
      },
      {
        condition: "Poor protein intake, digestion or absorption, malnutrition",
        prevalance: "",
        comment: `Low urea nitrogen concentration is seen in anorectic patients consuming less protein.
        <br />
        https://doi.org/10.1080/07315724.1989.10720325
        https://www.ncbi.nlm.nih.gov/books/NBK305/
        https://doi.org/10.1038/sj.ejcn.1602050
        `,
        evidence: "Strong"
      },
      {
        condition: "Excess hydration",
        prevalance: "",
        comment: `Drinking too much water increases urea clearance in the kidneys and hence a low blood urea nitrogen (BUN) value.
        <br />
        https://doi.org/10.3390/nu12041191
        https://pubmed.ncbi.nlm.nih.gov/20593354/
        https://doi.org/10.1046/j.1523-1755.2001.060002748.x
        `,
        evidence: "Strong"
      },
    ];
  }

  // Bile Acid
  if (marker === 344) {
    data.high = [
      {
        condition: "Biliary tree dysfunction",
        prevalence: "Common in the general population",
        comment: `Biliary obstruction refers to the impairment of bile flow from the liver to the small intestine due to blockage of the biliary duct system. Total bile acids are metabolized in the liver and can serve as a marker for normal liver function. Bile acid levels are increased in the serum and liver in patients with obstructive jaundice or cholestasis.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK548626/
        https://www.ncbi.nlm.nih.gov/books/NBK539698/
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver dysfunction",
        prevalence: "Common in the general population",
        comment: `Bile acids are formed in the liver from cholesterol, excreted via bile into the intestine, where they are reabsorbed into portal circulation and returned to the liver. Under normal circumstances serum bile acids depend closely on this enterohepatic circulation. Thus, serum bile acid levels reflect the amount of those escaping extraction from the portal blood. In liver disease, serum bile acids depend on the relationship between the decreased hepatic extraction efficiency or reduced functional hepatocyte mass and portal-systemic shunting.
        <br />
        https://doi.org/10.1136/gut.12.2.145
        https://doi.org/10.3904/kjim.1986.1.1.37
        https://doi.org/10.1016/0009-8981(96)06305-x
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Decreased bile synthesis",
        prevalance: "",
        comment: `There is no evidence to support this claim.`,
        evidence: ""
      }
    ];
  }

  // Neutrophils
  if (marker === 124) {
    data.high = [
      {
        condition: "Generally due to bacterial infection and/or inflammation",
        prevalence: "Common in the general population",
        comment: `Neutrophils are the primary white blood cells that respond to a bacterial infection, so the most common cause of neutrophilia is a bacterial infection, especially pyogenic infections. Neutrophils are also increased in any acute inflammation, so will be raised after a heart attack, other infarct or burns.
        <br />
        https://doi.org/10.3389/fphys.2018.00113
        https://doi.org/10.3389/fimmu.2018.02171
        https://academic.oup.com/rheumatology/article-pdf/49/9/1618/5048714/keq045.pdf
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Copper deficiency",
        prevalance: "Rare in the general population",
        comment: `An early clinical sign of copper deficiency is a reduction in the number of circulating neutrophils. Although copper is known to play a wide variety of roles in the organism and in the immune system, the molecular mechanism for copper-deficient neutropenia is not known.
        <br />
        https://doi.org/10.1111/j.1753-4887.1995.tb01503.x
        https://doi.org/10.1136/bcr-2016-214874
        https://doi.org/10.1002/ajh.20647
       `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B12 or folate deficiency",
        prevalance: "Rare in the general population",
        comment: `Vitamin B12 plays a role in the production of intermediates necessary for normal cell function.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/1260135/
        https://dx.doi.org/10.18203/2349-3291.ijcp20195723
       `,
        evidence: "Strong"
      },
      {
        condition: "Elevations in other types of white blood cells",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Lymphocytes
  if (marker === 120) {
    data.high = [
      {
        condition: "Hypoadrenalism",
        prevalence: "Rare in general population",
        comment: `Lymphocytosis and neutropenia as well as a general increase in lymphoid tissue have been repeatedly observed in hypoadrenalism (Addison's disease). Adrenal steroids control to a considerable extent the circulating lymphocyte level and mass of lymphoid tissue.
        <br />
        https://doi.org/10.1182/blood.V3.7.769.769
        https://www.ncbi.nlm.nih.gov/books/NBK499968/
        `,
        evidence: "Strong"
      },
      {
        condition: "Crohn’s disease",
        prevalence: "Common in the general population",
        comment: `There is evidence that proportions of both T- and B-lymphocytes in the peripheral blood of patients with Crohn's disease can be in the same ranges as those from healthy control subjects.
        <br />
        https://gut.bmj.com/content/gutjnl/21/6/507.full.pdf
        https://doi.org/10.1016/j.crohns.2011.10.016
        `,
        evidence: "Strong"
      },
      {
        condition: "Other autoimmune diseases",
        prevalence: "Common in the general population",
        comment: `Some autoimmune disorders that causes chronic inflammation may cause lymphocytosis.
        <br />
        https://doi.org/10.1007/s12016-017-8608-5
        `,
        evidence: "Strong"
      },
      {
        condition: "Viral infections",
        prevalence: "Common in the general population",
        comment: `High lymphocyte blood levels may indicate that the body is dealing with an infection or other inflammation causing conditions.
        <br />
        https://www.ncbi.nlm.nih.gov/pubmed/10506437
        https://www.ncbi.nlm.nih.gov/pubmed/10094651
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "Zinc deficiency",
        prevalance: "Rare in the general population",
        comment: `Zinc is crucial for normal development and function of cells mediating innate immunity, neutrophils, and natural killer cells
        <br />
        https://doi.org/10.1093/jn/130.5.1399S
        https://pubmed.ncbi.nlm.nih.gov/3120653/
        https://doi.org/10.1139/y00-052
        https://doi.org/10.2119/2008-00033.Prasad
       `,
        evidence: "Strong"
      },
      {
        condition: "Elevations of other white blood cells",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Monocytes x
  if (marker === 122) {
    data.high = [
      {
        condition: "Collagen disease, such as Rheumatoid Arthritis",
        prevalence: "Common in the general population",
        comment: `Activation and migration of monocytes from peripheral blood into the joints are considered as early events in the development of Rheumatoid Arthritis and circulating monocytes have been found to be increased in early Rheumatoid Arthritis patients.
        <br />
        https://doi.org/10.5114/reum.2018.74742
        https://doi.org/10.1046/j.1365-2249.1996.d01-820.x
        https://doi.org/10.1111/j.1365-2249.2012.04626.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Generalized, systemic inflammation",
        prevalance: "Common in the general population",
        comment: `A heightened percentage of monocytes in the blood can be caused by: chronic inflammatory disease, such as inflammatory bowel disease. a parasitic or viral infection.
        <br />
        https://doi.org/10.1111/imr.12219
        https://doi.org/10.1556/EuJMI.2.2012.2.1
        `,
        evidence: "Strong"
      },
      {
        condition: "Ulcerative colitis",
        prevalance: "Common in the general population",
        comment: `
        https://doi.org/10.1155/2019/6517549
        https://doi.org/10.1097/MIB.0000000000000427
        https://doi.org/10.3389/fimmu.2018.02764
        `,
        evidence: "Strong"
      },
      {
        condition: "Non‐alcoholic fatty liver disease",
        prevalance: "Common in the general population",
        comment: `There is evidence from one study that high monocytes can be associated with non‐alcoholic fatty liver disease.
        <br />
        https://doi.org/10.1620/tjem.223.227
        `,
        evidence: "Strong"
      },
      {
        condition: "Recovery state after an infection or trauma",
        prevalance: "",
        comment: `A high monocyte count also called monocytosis is often associated with chronic or subacute infections. A high monocyte count can occur when one is recovering from an acute infection.
        <br />
        https://doi.org/10.1111/imr.12219
        `,
        evidence: "Strong"
      },
      {
        condition: "Recovery state after an infection or trauma",
        prevalance: "",
        comment: `A high monocyte count also called monocytosis is often associated with chronic or subacute infections. A high monocyte count can occur when one is recovering from an acute infection.
        <br />
        https://doi.org/10.1111/imr.12219
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Eosinophils
  if (marker === 119) {
    data.high = [
      {
        condition: "Primary biliary cirrhosis",
        prevalence: "Common in middle age women between the ages of 40 to 60",
        comment: `Eosinophilia, a higher than normal level of eosinophils, is a common and distinctive feature of patients with Primary biliary cirrhosis.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/8633501/
        https://doi.org/10.1097/00042737-200404000-00011
        https://doi.org/10.2337/diacare.26.10.2963
        `,
        evidence: "Strong"
      },
      {
        condition: "Elevated platelet counts and fibrinogen",
        prevalence: "",
        comment: `Higher eosinophil count has been associated with increased coagulation factors, level of serum fibrinogen and platelet count.
        <br />
        https://doi.org/10.1136/pgmj.63.745.943
        http://dx.doi.org/10.1007/s11239-008-0247-5
        https://doi.org/10.1053/j.seminhematol.2012.01.005
        `,
        evidence: "Strong"
      }
    ];
    data.low = [
      {
        condition: "",
        prevalence: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Basophils
  if (marker === 113) {
    data.high = [
      {
        condition: "Inflammation, allergy",
        prevalence: "Common in the general population",
        comment: `There is evidence that basophil numbers increase in response to interleukin 3 (IL-3) or Thymic stromal lymphopoietin (TSLP) and migrate into tissues to promote type 2 immune responses.
        <br />
        Basophils play crucial roles in both immunoglobulin E (IgE)-dependent and -independent allergic inflammation, through their migration to the site of inflammation and secretion of various mediators, including cytokines, chemokines, and proteases. Basophils are known to produce large amounts of IL-4 in response to various stimuli.
        <br />
        https://doi.org/10.1016/j.alit.2017.04.007
        https://doi.org/10.1016/j.ejphar.2015.04.049
        https://journals.lww.com/nursingcriticalcare/fulltext/2019/07000/basophil_count.5.aspx
        `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        prevalence: "Common in the general population",
        comment: `There is evidence that in patients with hypothyroidism, the number of basophils may not be statistically different from the values of basophils in healthy controls.
        <br />
        https://doi.org/10.1007/BF00210959
        `,
        evidence: "Weak"
      },
      {
        condition: "Chronic hemolytic anemia",
        prevalence: "Rare in the general population",
        comment: `Studies show that chronic hemolytic anemia causes basophilia, a higher than normal level of basophils.
        <br />
        https://doi.org/10.1097/01.CCN.0000559778.07144.9d
        https://journals.lww.com/nursingcriticalcare/fulltext/2019/07000/basophil_count.5.aspx
        `,
        evidence: "Strong"
      },
    ];
    data.low = [
      {
        condition: "",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Platelet Count
  if (marker === 1473) {
    data.high = [
      {
        condition: "Temporarily after excess alcohol consumption",
        prevalence: "Common in the general population",
        comment: `There is evidence that cessation of chronic alcohol use may cause rebound thrombocytosis.
        <br />
        https://doi.org/10.1016/s0140-6736(77)92587-9
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6826798/
        https://doi.org/10.1016/s0140-6736(77)92957-9
        https://doi.org/10.1136/jnnp.61.4.376
        `,
        evidence: "Strong"
      },
      {
        condition: "Iron deficiency anemia",
        prevalence: "Common in the general population",
        comment: `Iron deficiency is a common cause of reactive thrombocytosis. It is believed that iron deficiency increases megakaryopoietic differentiation and alters platelet phenotype without changes in megakaryocyte growth factors, specifically TPO.
        <br />
        https://doi.org/10.1002/ajh.23682
        https://doi.org/10.1111/vox.12454
        https://doi.org/10.2169/internalmedicine.44.1090
        `,
        evidence: "Strong"
      },
      {
        condition: "Collagen diseases (rheumatoid arthritis, lupus)",
        prevalence: "Common in the general population",
        comment: `Studies show that thrombocytosis accompanies the more severe cases of rheumatoid disease and is due to a compensatory increase in platelet production associated with active intravascular coagulation.
        <br />
        http://dx.doi.org/10.1136/ard.35.2.138
        https://doi.org/10.1007/s00296-010-1747-0
        https://doi.org/10.1136/ard.42.5.545
        `,
        evidence: "Strong"
      },
      {
        condition: "Oral contraceptives",
        prevalence: "Common in the general population",
        comment: `There is evidence that early introduction of third generation hormonal contraception can produce an initial increase in the platelet count and that long-term use of hormonal contraceptives is associated with a reduction in platelets count.
        <br />
        https://meritresearchjournals.org/mms/content/2014/January/Isaac%20et%20al.pdf
        `,
        evidence: "Moderate"
      },
      {
        condition: "Inflammatory conditions such as inflammatory bowel disease (IBD) or rheumatoid arthritis",
        prevalence: "Common in the general population",
        comment: `Conditions with inflammation, like rheumatologic disorders, inflammatory bowel disease, and vasculitides, can have thrombocytosis. The elevated platelet count occurs in response to cytokines.
        <br />
        https://doi.org/10.1155/2019/9213074
        https://doi.org/10.1113/jphysiol.2011.225417
        https://doi.org/10.1182/blood-2013-11-462432
        `,
        evidence: "Moderate"
      },
      {
        condition: "Hemolytic anemia and/or blood loss",
        prevalence: "Hemolytic anemia is rare in the general population",
        comment: `
        https://doi.org/10.4274/tjh.2017.0466
        https://www.ncbi.nlm.nih.gov/books/NBK560810/
        https://doi.org/10.1177/000992289403300605
        `,
        evidence: "Strong"
      },
      {
        condition: "Infectious diseases such as tuberculosis",
        prevalence: "Rare in the general population",
        comment: `Mycobacterium tuberculosis infection is associated with thrombocytosis. This effect might be related to increased levels of interleukin 6 and may lead to a hypercoagulable state and deep vein thrombosis. The most common infections causing thrombocytosis are soft-tissue, pulmonary and gastrointestinal infections
        <br />
        https://doi.org/10.1309/AJCPCM1CKASVBMBP
        https://doi.org/10.4021/jocmr1125w
        http://dx.doi.org/10.18203/2320-6012.ijrms20172991
        `,
        evidence: "Strong"
      },
      {
        condition: "Vitamin B12 and folate deficiency",
        prevalence: "Rare in the general population",
        comment: `There is no evidence to support the claim.`,
        evidence: "Weak"
      },
      {
        condition: "Temporarily after physical activity or exertion",
        prevalence: "",
        comment: `Several studies show that acute exercise results in a transient increase in platelet count. This increase is caused by hemoconcentration and by platelet release from the liver, lungs, and, importantly, the spleen.
        <br />
        https://doi.org/10.1155/2015/165078
        https://doi.org/10.1002/ajh.2830340302
        https://doi.org/10.1111/j.1600-0609.1984.tb02172.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Cancer, most commonly lung cancer, gastrointestinal cancer, ovarian cancer, breast cancer, or lymphoma",
        prevalence: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Surgical removal of spleen",
        prevalence: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Thrombocytopenia in hospitalized alcoholics may be caused by splenomegaly, folate deficiency, and, most frequently, a direct toxic effect of alcohol on production, survival time, and function of platelets. Platelet count begins to rise after 2 to 5 days' abstinence from alcohol.
        <br />
        https://doi.org/10.1080/00325481.1991.11700918
        https://doi.org/10.1016/j.alcohol.2020.02.166
        https://doi.org/10.7326/0003-4819-68-3-526
       `,
        evidence: "Strong"
      },
      {
        condition: "Liver dysfunction, Cirrhosis",
        prevalance: "Common in the general population",
        comment: `The reduction of platelet count in blood, is a common hematological complication of chronic liver disease caused by decreased production of hormone thrombopoietin (TPO) in the damaged liver and/or increased destruction of platelets through phagocytosis in the enlarged spleen, as well as the loss of hematopoietic function in bone marrow due to alcohol abuse or viral infection.
        <br />
        https://doi.org/10.3748/wjg.v23.i18.3228
        https://doi.org/10.2147/HMER.S74612
        https://doi.org/10.1002/cld.860
       `,
        evidence: "Strong"
      },
      {
        condition: "Certain viral and bacterial infections",
        prevalance: "Common in the general population",
        comment: `Upon infection the host defense generally induces a systemic inflammatory response, which leads to platelet activation and subsequent clearance. Furthermore, platelets can bind to neutrophils, forming platelet-neutrophil aggregates, which in turn triggers the phagocytosis of platelets
        <br />
        https://doi.org/10.3389/fimmu.2014.00649
        https://doi.org/10.3390/jcm10040877
        https://www.ncbi.nlm.nih.gov/pubmed/23402303
       `,
        evidence: "Strong"
      },
      {
        condition: "Pernicious anemia",
        prevalance: "Rare in the general population",
        comment: `Pernicious anemia is a type of vitamin B12 anemia. Deficiency of vitamin B12 and folic acid can result in low platelet production by the bone marrow.
        <br />
        https://doi.org/10.1159/000207635
        https://pubmed.ncbi.nlm.nih.gov/2329689/
       `,
        evidence: "Strong"
      },
      {
        condition: "Aplastic anemia",
        prevalance: "Rare in the general population",
        comment: `Aplastic anemia results from damage to the blood stem cells. Stem cells are immature cells in the bone marrow that give rise to all blood cell types (red blood cells, white blood cells, and platelets). Injury to the stem cells leads to a decrease in the number of these blood cell types.
        <br />
        https://doi.org/10.1007/s12185-013-1352-6
        https://www.ncbi.nlm.nih.gov/books/NBK542208/
        https://www.ncbi.nlm.nih.gov/books/NBK534212/
       `,
        evidence: "Strong"
      },
      {
        condition: "Bleeding",
        prevalance: "",
        comment: `Blood loss can lead to decrease of all blood cells, including platelets.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/9704474/
       `,
        evidence: "Strong"
      },
      {
        condition: "Congenital (genetic) syndromes that result in a decreased number of platelets",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Idiopathic thrombocytopenia",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Drugs such as aspirin and ibuprofen, some antibiotics (including those containing sulfa), colchicine and indomethacin, H2-blocking agents, hydralazine and othersa",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Bone marrow damage caused by exposure to toxic chemicals, such as certain pesticides or benzene",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Heparin-induced thrombocytopenia (HIT)",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Leukemia, lymphoma, or another cancer that has spread (metastasized) to the bone marrow",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Autoimmune disorders, such as lupus",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Chemotherapy or radiation therapy",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Conditions such as disseminated intravascular coagulation (DIC), thrombocytopenic purpura (TTP), and hemolytic uremic syndrome (HUS).",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Uric Acid
  if (marker === 1885) {
    data.high = [
      {
        condition: "Chronically elevated serum glucose",
        prevalence: "Common in the general population",
        comment: `Uric acid levels rise with increasing blood glucose concentrations in the normal and prediabetes population. However, in type 2 diabetes patients, uric acid levels tend to decline with increasing blood glucose concentrations.
        <br />
        https://doi.org/10.1155/2016/7184123
        https://doi.org/10.1007/BF01221964
        https://doi.org/10.1093/oxfordjournals.aje.a114807
        `,
        evidence: "Strong"
      },
      {
        condition: "Gout",
        prevalance: "Common in the general population",
        comment: `When there is too much uric acid in the body, uric acid crystals (monosodium urate) can build up in joints, fluids, and tissues within the body. Increased concentrations of uric acid in the joints can lead to the joint inflammation and pain characteristic of gout.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK459218/
        https://doi.org/10.2741/3950
        https://doi.org/10.1016/j.jare.2017.03.003
        `,
        evidence: "Strong"
      },
      {
        condition: "Liver dysfunction",
        prevalance: "Common in the general population",
        comment: `Elevated serum uric acid (UA) levels strongly reflect and may even cause oxidative stress, insulin resistance, and metabolic syndrome, which are risk factors for the progression of liver disease.
        <br />
        https://doi.org/10.1002/hep.23717
        https://doi.org/10.3390/medicina55090600
        https://doi.org/10.1016/j.metabol.2012.08.013
        `,
        evidence: "Strong"
      },
      {
        condition: "Hyperlipidemia",
        prevalance: "Common in the general population",
        comment: `Higher serum LDL cholesterol, triglycerides, total cholesterol, apolipoprotein-B levels, and ratio of triglycerides to HDL cholesterol and apolipoprotein-B to AI levels are positively correlated with higher serum uric acid levels, whereas serum HDL cholesterol levels are inversely correlated.
        <br />
        https://doi.org/10.1155/2015/127596
        https://doi.org/10.1186/s12872-019-1026-2
        `,
        evidence: "Strong"
      },
      {
        condition: "Excess alcohol intake",
        prevalance: "Common in the general population",
        comment: `Purine nucleotide degradation during ethanol catabolism, inhibition of renal excretion of urate by lactic acid, and high purine content of certain kinds of beverage are responsible for the elevation of serum uric acid level following alcohol drinking.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/8976122/
        https://doi.org/10.1002/art.20821
        https://doi.org/10.1016/j.cccn.2005.01.024
        `,
        evidence: "Strong"
      },
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `In hypothyroidism the hyperuricemia is secondary to a decreased renal plasma flow and impaired glomerular filtration.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/11791637/
        https://pubmed.ncbi.nlm.nih.gov/26619549/
        https://doi.org/10.1155/2019/5904264
        `,
        evidence: "Strong"
      },
      {
        condition: "Kidney dysfunction",
        prevalance: "Common in the general population",
        comment: `In kidney disease, the kidneys cannot filter out uric acid as well as they should, causing too much uric acid building up in the body.
        <br />
        https://doi.org/10.1152/ajprenal.00272.2019
        https://doi.org/10.1093/ndt/gft029
        https://doi.org/10.1038/s41598-020-77702-x
        `,
        evidence: "Strong"
      },
      {
        condition: "Fungal infection",
        prevalance: "Common in the general population",
        comment: `There is evidence that fungi produce preformed uric acid, preformed urate crystals, lipoproteins, glycosaminoglycans and glutamates, excess of which are found in gout.
        <br />
        https://doi.org/10.1007/978-1-4684-5673-8_44
        https://doi.org/10.3390/microorganisms5020033
        `,
        evidence: "Strong"
      },
      {
        condition: "Toxemia of pregnancy",
        prevalance: "Common in pregnant women",
        comment: `Preeclampsia, formerly called toxemia, is when pregnant women have high blood pressure, protein in their urine, and swelling in their legs, feet, and hands. Increased uric acid level is a key clinical feature of preeclampsia; higher levels correlate with significant maternal and fetal morbidity and mortality. The cause of hyperuricemia and its specific role in the pathogenesis of preeclampsia, however, remain unclear.
        <br />
        https://doi.org/10.1016/j.semnephrol.2004.09.009
        https://doi.org/10.1016/j.placenta.2007.11.001
        https://doi.org/10.1097/MD.000000000001546
        `,
        evidence: "Strong"
      },
      {
        condition: "Hemolytic anemia",
        prevalance: "Rare in the general population",
        comment: `The initial event in the development of hyperuricemia presumably is increased synthesis of nucleic acids occurring as part of the erythropoietic response to hemolysis. Catabolism of the nucleic acids generates urate. Increased production of uric acid normally is compensated for by increased urinary excretion of uric acid.
        <br />
        https://doi.org/10.1016/0049-0172(83)90020-3
        https://doi.org/10.1001/archpedi.1976.02120090064011
        https://doi.org/10.1309/8DXD-VJT9-UN60-YACT
        `,
        evidence: "Strong"
      },
      {
        condition: "High protein diet",
        prevalance: "",
        comment: `A high-protein diet typically contains large quantities of purines. There is evidence that consumption of animal protein and seafood are associated with higher prevalence of hyperuricemia.
        <br />
        https://doi.org/10.1016/j.numecd.2010.07.012
        https://doi.org/10.1002/art.20761
        https://pubmed.ncbi.nlm.nih.gov/18634142/
        `,
        evidence: "Strong"
      },
      {
        condition: "Starvation and/or extreme calorie restriction/Ketoge nic diet",
        prevalance: "",
        comment: `Like a high purine diet, starvation increases the amount of purine converted to uric acid. A very low calorie diet lacking in carbohydrates can induce extreme hyperuricemia; including some carbohydrate (and reducing the protein) reduces the level of hyperuricemia.
        <br />
        https://doi.org/10.3181/00379727-118-29971
        https://doi.org/10.1016/0002-9343(67)90005-8
        https://jamanetwork.com/journals/jama/article-abstract/238528
        `,
        evidence: "Strong"
      },
      {
        condition: "Excess acidity",
        prevalance: "",
        comment: `Types of acidosis that can cause hyperuricemia include lactic acidosis, diabetic ketoacidosis, alcoholic ketoacidosis, and starvation ketoacidosis. Ethanol, for instance, increases production of uric acid by increasing production of lactic acid, hence lactic acidosis.
        <br />
        https://doi.org/10.1016/j.cccn.2005.01.024
        https://doi.org/10.1056/NEJM196209132671102
        https://doi.org/10.1136/ard.29.5.553
        `,
        evidence: "Strong"
      },
      {
        condition: "High supplemental niacin intake",
        prevalance: "",
        comment: `Niacin can occasionally increase plasma uric acid levels and induce gout. This effect may be due to the inhibition effect of niacin on uricase, an oxidizing enzyme of uric acid, or due to a decrease in uric acid excretion.
        <br />
        https://doi.org/10.1194/jlr.R040592
        https://pubmed.ncbi.nlm.nih.gov/4367231/
        https://doi.org/10.1007/BF02955463
        https://doi.org/10.1016/0026-0495(71)90026-6
        `,
        evidence: "Strong"
      },
      {
        condition: "Excess consumption of fructose",
        prevalance: "",
        comment: `Fructose stimulates the production of uric acid. When ATP is consumed, adenosine monophosphate (AMP) accumulates and stimulates ATP deaminase, which then triggers the production of uric acid, which can induce the accumulation of triglycerides.
        <br />
        https://doi.org/10.1152/ajprenal.00140.2005
        https://doi.org/10.1093/ajcn/58.5.754S
        https://doi.org/10.1097/MOG.0b013e3282f3f4c4
        `,
        evidence: "Strong"
      },
      {
        condition: "Cancer (multiple myeloma, leukemias) and cancer chemotherapy",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Iron deficiency",
        prevalance: "Common in the general population",
        comment: `There is evidence that serum concentrations of ferritin correlate positively with uric acid levels in healthy individuals.
        <br />
        https://doi.org/10.1080/10715760400026088
        https://doi.org/10.1042/bj2350747
        https://doi.org/10.1006/abbi.1994.1379
       `,
        evidence: "Strong"
      },
      {
        condition: "Molybdenum deficiency",
        prevalance: "Rare in the general population",
        comment: `Owing to its role as an essential cofactor of sulfite oxidase, aldehyde oxidases, xanthine dehydrogenase, and hypotaurine dehydrogenase, deficiency of Molybdenum cofactor induces hypouricemia and increases the urinary excretion of sulfite, thiosulfate, S-sulfocysteine, taurine, hypoxanthine, and xanthine.
        <br />
        https://doi.org/10.3760/cma.j.cn112140-20200911-00866
        https://doi.org/10.1055/s-2005-872877
        https://pubmed.ncbi.nlm.nih.gov/8410516/
       `,
        evidence: "Strong"
      },
      {
        condition: "Wilson disease",
        prevalance: "Rare in the general population",
        comment: `Wilson's disease is a disease in which copper accumulates in tissues of vital organs like the brain and liver. It can lead to decreased blood uric acid levels because of associated kidney problems (i.e., Fanconi syndrome) that increase urinary uric acid excretion.
        <br />
        https://doi.org/10.1136/ard.35.4.372
        https://doi.org/10.1038/s41598-020-65639-0
        https://doi.org/10.1002/hep.1840030516
       `,
        evidence: "Strong"
      },
      {
        condition: "Zinc deficiency",
        prevalance: "Rare in the general population",
        comment: `There is evidence that zinc increases uric acid synthesis in the liver.
        <br />
        https://doi.org/10.3390/nu10050568
        https://doi.org/10.1097/00000441-198611000-00007
        https://doi.org/10.1016/j.ejphar.2012.01.022
       `,
        evidence: "Strong"
      },
      {
        condition: "Low purine intake (eg vegetarian)",
        prevalance: "",
        comment: `Hypouricemia is common in vegetarians due to the low purine content of most vegetarian diets. Vegetarian diet has been found to result in mean serum uric acid values as low as 239 μmol/L (2.7 mg/dL). In addition, transient hypouricemia sometimes is associated with total parenteral nutrition.
        <br />
        https://doi.org/10.1007/s00394-003-0428-0
        https://doi.org/10.1016/j.nut.2004.06.006
        https://doi.org/10.1093/ajcn/34.11.2493
       `,
        evidence: "Strong"
      },
      {
        condition: "Oxidative stress",
        prevalance: "",
        comment: `It is believed that an increase in oxidative stress could be linked to a reduction in plasmatic levels of uric acid, which is probably directly caused by an overproduction of nitric oxide (NO).
        <br />
        https://doi.org/10.1002/dmrr.814
       `,
        evidence: "Strong"
      },
      {
        condition: "Excess serum alkalinity",
        prevalance: "",
        comment: `There is a single evidence of the association between metabolic alkalosis and hypouricaemia in a case of Gitelman's syndrome. Gitelman’s syndrome is a kidney disorder characterized by metabolic alkalosis.
        <br />
        https://doi.org/10.1093/ndt/16.11.2250
       `,
        evidence: "Moderate"
      },
      {
        condition: "Exposure to toxic compounds",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Kidney diseases, Fanconi syndrome",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Liver disease",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
  }

  // Gamma-glutamyl transferase (GGT)
  if (marker === 859) {
    data.high = [
      {
        condition: "Diabetes, Metabolic syndrome",
        prevalence: "Common in the general population",
        comment: `Serum gamma-glutamyl transferase (GGT) is a marker of oxidative stress. Increased oxidative stress has been associated with ß-cell dysfunction and reducing insulin action. Therefore, serum GGT activity could reflect several different processes relevant to diabetes pathogenesis and metabolic syndrome.
        <br />
        https://doi.org/10.1007/s10654-009-9346-7
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3214292/
        https://doi.org/10.2337/diacare.27.6.1427
        `,
        evidence: "Strong"
      },
      {
        condition: "Alcoholism",
        prevalance: "Common in the general population",
        comment: `Chronic alcohol consumption leads to increased activities of gamma-glutamyltransferase (GGT) in the serum which are associated with an enhancement of GGT activities in the liver.
        <br />
        https://doi.org/10.1007/978-1-4757-1419-7_67
        https://doi.org/10.1016/j.drugalcdep.2013.09.016
        https://doi.org/10.7860/JCDR/2015/14752.6895
        `,
        evidence: "Strong"
      },
      {
        condition: "Biliary tree dysfunction (cholestasis)",
        prevalance: "Common in the general population",
        comment: `GGT activity in the serum is a marker of hepatobiliary injury, especially cholestasis and biliary effect, although it is not only expressed in liver but also in kidney, pancreas, and bile ducts. The rise is significantly higher in extraphepatic cholestasis as compared to intrahepatic cholestasis.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/9491680/
        https://doi.org/10.1046/j.1440-1746.2003.03171.x
        `,
        evidence: "Strong"
      },
      {
        condition: "Pancreatitis",
        prevalance: "Rare in the general population",
        comment: `Gamma Glutamyl Transferase is a membrane-bound enzyme occurring in different tissues, but most abundantly in kidneys, liver and pancreas. There is evidence that pancreatitis causes moderate elevations in GGT activity.
        <br />
        https://doi.org/10.7150/ijms.38657
        https://doi.org/10.1590/S0041-87811999000200005
        `,
        evidence: "Strong"
      },
      {
        condition: "Oxidative Stress",
        prevalance: "",
        comment: `Oxidative stress is a phenomenon caused by an imbalance between production and accumulation of oxygen reactive species (ROS) in cells and tissues and the ability of a biological system to detoxify these reactive products. Serum gamma glutamyltransferase is a marker of oxidative stress.
        <br />
        https://doi.org/10.1080/10715760410001694026
        https://doi.org/10.1155/2016/8490643
        https://doi.org/10.1038/bjc.2012.128
        `,
        evidence: "Strong"
      },
      {
        condition: "Hepatitis",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Cirrhosis",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Alcoholic liver disease",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Liver toxic drugs",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Congestive heart failure",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Hypothyroidism",
        prevalance: "Common in the general population",
        comment: `There is evidence that serum GGT activity is frequently increased in patients with hyperthyroidism and may be decreased in patients with hypothyroidism.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/6119059/
       `,
        evidence: "Strong"
      },
      {
        condition: "Magnesium",
        prevalance: "Rare in the general population.",
        comment: `There is evidence that there is an inverse correlation between magnesium level and GGT levels. That is, when one value increases and the other decreases.
        <br />
        http://dx.doi.org/10.5958/j.2319-5886.3.1.003
       `,
        evidence: "Weak"
      }
    ];
  }

  // Bilirubin
  if (marker === 348) {
    data.high = [
      {
        condition: "Liver dysfunction",
        prevalence: "Common in the general population",
        comment: `Elevated levels may indicate liver damage or disease. Higher than normal levels of direct bilirubin in the blood may indicate the liver is not clearing bilirubin properly.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/8114283/
        https://www.ncbi.nlm.nih.gov/books/NBK544252/
        `,
        evidence: "Strong"
      },
      {
        condition: "Gilbret’s Syndrome",
        prevalence: "Common in the general population",
        comment: `Gilbert's syndrome (GS) is a mild liver disorder in which the liver does not properly process bilirubin. Gilbert's syndrome produces an elevated level of unconjugated bilirubin in the bloodstream, but normally has no serious consequences.
        <br />
        https://doi.org/10.1001/jama.2014.12835
        https://doi.org/10.1080/10408363.2018.1428526
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7149819/
        `,
        evidence: "Strong"
      },
      {
        condition: "Obstruction/Scarring of the bile ducts",
        prevalence: "Common in the general population",
        comment: `Bile passes out of the liver through the bile ducts and is stored in the gallbladder. After a meal, it is released into the small intestine. When the bile ducts become blocked, bile builds up in the liver, and jaundice (yellow color of the skin) develops due to the increasing level of bilirubin in the blood.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK539698/
        https://doi.org/10.1055/s-0036-1592331
        `,
        evidence: "Strong"
      },
      {
        condition: "Anemia (hemolytic or pernicious)",
        prevalence: "Both hemolytic and pernicious are rare in the general population.",
        comment: `In hemolysis, the concentration of unconjugated bilirubin (indirect bilirubin) is increased. Hemoglobin is broken down into a compound called bilirubin. Unconjugated bilirubin is elevated as the body is unable to eliminate it as quickly as it is produced with the destruction of RBCs.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/30215915/
        https://www.ncbi.nlm.nih.gov/books/NBK558904/
        https://pubmed.ncbi.nlm.nih.gov/15202694/
        `,
        evidence: "Strong"
      },
      {
        condition: "Rotor syndrome",
        prevalance: "Rare in the general population.",
        comment: `Rotor syndrome (also known as Rotor type hyperbilirubinemia) is a rare cause of mixed direct (conjugated) and indirect (unconjugated) hyperbilirubinemia. The disease is characterized by non-hemolytic jaundice due to chronic elevation of predominantly conjugated bilirubin.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK532306/
        https://www.ncbi.nlm.nih.gov/books/NBK114805/
        `,
        evidence: "Strong"
      },
      {
        condition: "Dubin-Johnson syndrome",
        prevalance: "Rare in the general population",
        comment: `Dubin-Johnson syndrome results from a mutation that leads to improper excretion of bilirubin from hepatocytes.
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK536994/
        https://pubmed.ncbi.nlm.nih.gov/18460254/
        `,
        evidence: "Strong"
      },
      {
        condition: "Crigler-Najjar syndromes",
        prevalance: "Rare in the general population",
        comment: `Crigler-Najjar syndrome is a severe condition characterized by high levels of bilirubin in the blood (hyperbilirubinemia). Bilirubin is produced when red blood cells are broken down. This substance is removed from the body only after it undergoes a chemical reaction in the liver, which converts the toxic form of bilirubin (called unconjugated bilirubin) to a nontoxic form called conjugated bilirubin. People with Crigler-Najjar syndrome have a buildup of unconjugated bilirubin in their blood (unconjugated hyperbilirubinemia).
        <br />
        https://www.ncbi.nlm.nih.gov/books/NBK562171/
        https://doi.org/10.1007/pl00014330
        https://doi.org/10.7860/JCDR/2017/28195.10221
        `,
        evidence: "Strong"
      },
      {
        condition: "Drug reactions",
        prevalance: "",
        comment: "",
        evidence: ""
      },
      {
        condition: "Tumors",
        prevalance: "",
        comment: "",
        evidence: ""
      }
    ];
    data.low = [
      {
        condition: "Zinc deficiency",
        prevalance: "Rare in the general population",
        comment: `There is evidence that zinc inhibits the enterohepatic circulation of unconjugated bilirubin by precipitating it in the intestine.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/15114295/
        http://dx.doi.org/10.1097/00005176-200502000-00010
       `,
        evidence: "Strong"
      },
      {
        condition: "Oxidative stress",
        prevalance: "",
        comment: `There is evidence that a decreased serum bilirubin can be a marker of oxidative stress.
        <br />
        https://pubmed.ncbi.nlm.nih.gov/23909269/
        https://doi.org/10.1007/s13340-016-0288-5
       `,
        evidence: "Strong"
      }
    ];
  }

  // end
  return data;
};
