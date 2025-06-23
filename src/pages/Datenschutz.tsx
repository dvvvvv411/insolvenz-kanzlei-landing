
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Datenschutzerklärung</h1>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Datenschutz auf einen Blick</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Allgemeine Hinweise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-3">
                  Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Datenerfassung auf dieser Website</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                      Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Wie erfassen wir Ihre Daten?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                      Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
                      durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, 
                      Betriebssystem oder Uhrzeit des Seitenaufrufs).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Wofür nutzen wir Ihre Daten?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
                      gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                      Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hosting</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Externes Hosting</h3>
              <p className="text-gray-700 leading-relaxed">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser 
                Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert.
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-3">
                Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine 
                Website generiert werden, handeln.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Datenschutz</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-3">
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                  Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hinweis zur verantwortlichen Stelle</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                
                <div className="text-gray-700 leading-relaxed">
                  <p>Lonquich, Külper & Kollegen Rechtsanwälte PartG</p>
                  <p>Burgstr. 120</p>
                  <p>60389 Frankfurt a. Main</p>
                  <p>Telefon: +49 69 94321306</p>
                  <p>E-Mail: info@kuelper-kanzlei.de</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Speicherdauer</h3>
                <p className="text-gray-700 leading-relaxed">
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
                  wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
                  Datenverarbeitung entfällt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ihre Betroffenenrechte</h3>
                <p className="text-gray-700 leading-relaxed mb-3">Sie haben folgende Rechte:</p>
                
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 ml-4">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerrufsrecht bei Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
                  <li>Beschwerderecht bei der Aufsichtsbehörde (Art. 77 DSGVO)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Datenerfassung auf dieser Website</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Server-Log-Dateien</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in 
                  so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-3">Dies sind:</p>
                
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 ml-4">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kontaktformular</h3>
                <p className="text-gray-700 leading-relaxed">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
