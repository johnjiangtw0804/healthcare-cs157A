$(document).ready(function() {
  var $app = $('#app');
  var $title = $('<h1>Nurse Dashboard</h1>');
  var $nurseFeed = $('<div class="nurseFeed"></div>');
  var $feed = $('<div class="feed"></div>');
  var $form = $('<form id="form">Nurse ID: </form>');
  var $input = $('<input type="text" id="nurseID" value="1">');
  var $button = $('<button id="update-feed">Enter</button>');

  $title.appendTo($app);
  $nurseFeed.appendTo($app);
  $feed.appendTo($app);
  $form.appendTo($title);
  $input.appendTo($form);
  $button.appendTo($title);

  // get default value
  var id = document.getElementById("nurseID").value;

  $button.on('click', function(event) {
    // console.log(document.getElementById("nurseID").value)
    id = document.getElementById("nurseID").value;
    logJSONData(id);
  });

  async function logJSONData(id) {
    var url = 'http://localhost:5500/api/dashboard/nurse?nurse_id=' + id;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(patient.patient_id);
    renderNurseInfo(data);
    renderFeed(data);
  }
  var renderNurseInfo = function(data) {
    $nurseFeed.html('');
    nurse = data.patients[0]
    $nurseFeed.append($('<div class="nurseId"></div>').text('Nurse ID: ' + nurse.nurse_id));
    $nurseFeed.append($('<div class="nurseFirstname"></div>').text('First Name: ' + nurse.nurse_first_name));
    $nurseFeed.append($('<div class="nurseLastname"></div>').text('Last Name: ' + nurse.nurse_last_name));
  }

  var renderFeed = function(data) {
    $feed.html('');
    patients = data.patients;
    patient = patients[i]
    for (var i = 0; i < patients.length; i++) {
      var patient = patients[i]
      var $perPatient = $('<div class="perPatient"></div>');

      // patient's info
      var $patientInfo = $('<div class="patientInfo"></div>');
      $patientInfo.append($('<div class="patientID"></div>').text('Patient ID: ' + patient.patient_id));
      $patientInfo.append($('<div class="firstname"> firstname</div>').text('First Name: ' + patient.patient_first_name));
      $patientInfo.append($('<div class="lastname"> lastname</div>').text('Last Name: ' + patient.patient_last_name));
      $patientInfo.append($('<div class="age"> age</div>').text('Age: ' + patient.age));
      $patientInfo.append($('<div class="sex"> sex</div>').text('Sex: ' + patient.sex));
      $patientInfo.append($('<div class="bloodtype"> bloodtype</div>').text('Bloodtype: ' + patient.blood_type));  // no A+
      $patientInfo.append($('<div class="data_of_birth"> data_of_birth</div>').text('Date Of Birth: ' + patient.dob.slice(0, 10)));
      $patientInfo.append($('<div class="address"> address</div>').text('Address: ' + patient.address));
      $patientInfo.append($('<div class="phone_number"> phone_number</div>').text('Phone Number: ' + patient.phone_number));

      // vital signs
      var $vitalSign = $('<div class="vitalSign"></div>');
      $vitalSign.append($('<div class="bodyTemperature"> bodyTemperature</div>').text('Body Temparature: ' + patient.body_temperature));
      $vitalSign.append($('<div class="pulseRate"> pulseRate</div>').text('Pulse Rate: ' + patient.pulse_rate));
      $vitalSign.append($('<div class="respirationRate"> respirationRate</div>').text('Respiration Rate: ' + patient.respiration_rate));  // always 0
      $vitalSign.append($('<div class="systolic_pressure"> systolic_presure</div>').text('Systolic Pressure: ' + patient.systolic_pressure));
      $vitalSign.append($('<div class="diastolic_pressure"> diastolic_pressure</div>').text('Diastolic Pressure: ' + patient.diastolic_pressure));

      // other
      var $other = $('<div class="other"></div>');
      $other.append($('<div class="prescribedMedication"> prescribedMedication</div>').text('Prescribed Medication: ' + arrayToString(patient.current_prescribed_meds)));
      $other.append($('<div class="assigned_doctor"> assigned_doctor</div>').text('Assigned Doctor: ' + patient.assigned_doctor_first_name + ' ' + patient.assigned_doctor_last_name));
      $other.append($('<div class="current_disease"> current_disease</div>').text('Current Disease: ' + arrayToString(patient.current_diseases)));

      $perPatient.appendTo($feed);
      $patientInfo.appendTo($perPatient);
      $vitalSign.appendTo($perPatient);
      $other.appendTo($perPatient);
    };
  };

  var arrayToString = function(array) {
    var string = $.map(array, function(i){
      return i.name;
    }).join(', ');
    return string
  }
  logJSONData(id)



});