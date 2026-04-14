<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $fullName = trim($_POST['full_name'] ?? '');
  $organization = trim($_POST['organization'] ?? '');
  $sector = trim($_POST['sector'] ?? '');
  $contactDetails = trim($_POST['contact_details'] ?? '');
  $investmentOverview = trim($_POST['investment_overview'] ?? '');

  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP(); 
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'hr@rethinkgroups.com';
    $mail->Password = 'piurbmivjqefpdcd';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('hr@rethinkgroups.com', 'Rethink Groups Website');
    $mail->addAddress('hr@rethinkgroups.com', 'Admin Department');

    $mail->isHTML(true);
    $mail->Subject = 'New Enquiry Received | Rethink Groups';

    $safeFullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $safeOrganization = htmlspecialchars($organization, ENT_QUOTES, 'UTF-8');
    $safeSector = htmlspecialchars($sector, ENT_QUOTES, 'UTF-8');
    $safeContactDetails = htmlspecialchars($contactDetails, ENT_QUOTES, 'UTF-8');
    $safeInvestmentOverview = nl2br(htmlspecialchars($investmentOverview, ENT_QUOTES, 'UTF-8'));
    date_default_timezone_set('Asia/Dubai');
    $submittedAt = date('d M Y, h:i A');

    $mail->Body = '
        <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;padding:30px 0;">
            <tr>
              <td align="center">
                <table width="700" cellpadding="0" cellspacing="0" border="0" style="width:700px;max-width:700px;background:#ffffff;border-radius:14px;overflow:hidden;">
                  
                  <tr>
                    <td style="background:linear-gradient(90deg,#48206E,#AD46FF,#F6339A);padding:28px 32px;color:#ffffff;">
                      <h2 style="margin:0;font-size:24px;font-weight:700;">New Enquiry Received</h2>
                      <p style="margin:8px 0 0 0;font-size:14px;line-height:22px;opacity:0.95;">
                        A new enquiry has been submitted through the Rethink Groups website.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:30px 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        
                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;width:180px;font-size:14px;font-weight:700;color:#1f2937;">
                            Full Name
                          </td>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;color:#4b5563;">
                            ' . $safeFullName . '
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;font-weight:700;color:#1f2937;">
                            Organization
                          </td>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;color:#4b5563;">
                            ' . $safeOrganization . '
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;font-weight:700;color:#1f2937;">
                            Sector
                          </td>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;color:#4b5563;">
                            ' . $safeSector . '
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;font-weight:700;color:#1f2937;">
                            Contact Details
                          </td>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;color:#4b5563;">
                            ' . $safeContactDetails . '
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;font-weight:700;color:#1f2937;vertical-align:top;">
                            Investment Overview
                          </td>
                          <td style="padding:12px 0;border-bottom:1px solid #e9edf2;font-size:14px;color:#4b5563;line-height:24px;">
                            ' . $safeInvestmentOverview . '
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:12px 0 0 0;font-size:14px;font-weight:700;color:#1f2937;">
                            Submitted At
                          </td>
                          <td style="padding:12px 0 0 0;font-size:14px;color:#4b5563;">
                            ' . $submittedAt . '
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px 32px;background:#fafbfc;border-top:1px solid #eef2f5;">
                      <p style="margin:0;font-size:12px;line-height:20px;color:#6b7280;">
                        This email was automatically generated from the Rethink Groups website enquiry form.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </div>';

    $mail->AltBody =
      "New Enquiry Received\n\n" .
      "Full Name: {$fullName}\n" .
      "Organization: {$organization}\n" .
      "Sector: {$sector}\n" .
      "Contact Details: {$contactDetails}\n" .
      "Investment Overview: {$investmentOverview}\n" .
      "Submitted At: {$submittedAt}\n";

    $mail->send();

    echo "<script>
            alert('Enquiry sent successfully!');
            window.location.href='index.html';
        </script>";

  } catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
  }
}
?>