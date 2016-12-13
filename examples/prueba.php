<?php
    /**
     * Recibe un objeto que tiene definido un atributo programmingPoints, y
     * @param null $objeto
     * @return null
     */
    private function getProgrammingVideos($objeto=NULL)
    {
        // Sacar los videos programados de los programming points
        if (isset($objeto->programmingPoints) && !empty($objeto->programmingPoints)) {
            //$objeto->test = array();
            if (isset($objeto->location) && isset($objeto->location->company)) {

                $company = $objeto->location->company;
                $ppps = $objeto->programmingPoints;

                if (isset($company->serverKentia) && isset($company->nombreKentia)) {
                    $serverKentia = $company->serverKentia;
                    $clienteKentia = $company->nombreKentia;

                        if (!empty($serverKentia) && !empty($clienteKentia)) {

                            $pppInfo = array(); // Variable auxiliar para guardar el ppp modificado con sus videos...
                            foreach ($ppps as $key => $ppp) {
                                $idx = $ppp->id;
                                $pppInfo[$idx] = $ppp;
                                $pppInfo[$idx]->videos = array();

                                $puntoKentia = $ppp->nombreKentia;
                                if (!empty($puntoKentia)) {
                                    $videos = $this->getVideos($serverKentia, $clienteKentia, $puntoKentia);
                                    $pppInfo[$idx]->videos = $videos;
                                    $pppInfo[$idx]->json_videoplayer = $this->getJsonForVideoPlayer($videos);
                                }

                            }

                            $objeto->programmingPoints = $pppInfo;
                        }
                }
            }

            // Generación de un fichero temporal encriptado que para ser leído posteriormente por Ajax y mostrar la info
            $filename = Tempfile::generateFilename( "asset-".$objeto->id."-ppps" ) ;
            $tempFile = new Tempfile( 'json/', $filename, json_encode($objeto->programmingPoints) );
        }
        return $objeto;
    }

    /**
     * Método temporal para acceder a la lista de videos de un punto de Kentia
     * @param null $nombrePunto
     * @param null $nombreKentia
     * @return array|null
     */
    public function getVideos($serverKentia = NULL, $clienteKentia = NULL, $puntoKentia = NULL)
    {

        if(empty($serverKentia) || empty($clienteKentia) || empty($puntoKentia)) return NULL;


            // ESTA USANDO DRIVER MYSQL OBSOLETO, SI USO MYSQLi NO DEVUELVE VIDEOS.
            $kentiadb = @$this->load->database($serverKentia, TRUE);

            $SQL = "
            SELECT DISTINCT
                NOW()  as fecha,
                programasvideodetalle.horaInicial as hora,
                programasvideodetalle.horaFinal  as horaFin,
                videos.videoFichero,
                videos.diario,
                videos.titulo,
                puntosv.nombrePunto,
                canalesvideo.canal as programa,
                programasvideomaster.fechaInicioPrograma as fechaPrograma,
                videos.fechaInicial as fechaVideo,
                programasvideomaster.fechaFinPrograma,
                IF (programasvideomaster.fechaFinPrograma > videos.fechaFinal, videos.fechaFinal, programasvideomaster.fechaFinPrograma) as fechafinal
        	FROM videos
        	INNER JOIN canalesvideo ON videos.videofichero = canalesvideo.videofichero
        	INNER JOIN programasvideomaster ON canalesvideo.canal=programasvideomaster.programa
        	INNER JOIN programasvideodetalle ON programasvideodetalle.programa=programasvideomaster.programa
        	INNER JOIN puntosv ON puntosv.programa = programasvideodetalle.programa
        	WHERE
        	    (CURDATE() BETWEEN  programasvideomaster.fechaInicioPrograma AND programasvideomaster.fechaFinPrograma)
                AND (CURDATE() BETWEEN  videos.fechaInicial AND videos.fechaFinal)
                AND puntosv.nombrePunto LIKE '$puntoKentia'
                AND puntosv.cliente LIKE '$clienteKentia'
            GROUP BY videos.titulo;
            ";


            $query = @$kentiadb->query($SQL);
            if ($query->num_rows > 0) {
                //si existen los programas devolvemos el array de programas ya cargado con los nombres
                $videos = array();
                $videoServer = "http://$serverKentia.altabox.net/";
                $videoDirs = "kentia/webserver/video/$clienteKentia/";

                foreach ($query->result() as $row) {
                    $video = new stdClass();
                    $video->file = $row->videoFichero;
                    $video->title = $row->titulo;
                    $video->baseUrl = $videoServer . $videoDirs;

                    $video->href = '#';
                    $video->text = $row->titulo;
                    $video->sources = $this->getVideoPreviewSources($videoServer . $videoDirs . $row->videoFichero, TRUE);
                    $videos[] = $video;

                }
                return $videos;
            }

    }





    /**
     * FUNCION TEMPORAL
     *
     * Genera SRCs en objeto para el VideoPlayer en base a un fichero base que sale de kentia. Una funcion posterior
     * generará el JSON ya exacto
     * Se generarán X previews en formatos web; TODO: Comprobar que los videos vinculados son los que genera la preview.
     *
     * @param $fullURL
     * @return array
     */
    private function getVideoPreviewSources($fullURL, $checkExistance = FALSE)
    {
        $parts = ( get_url_parts($fullURL) );

        $sourceTypes = ["mp4", "webm", "ogv"];
        $iSrcTypes = count($sourceTypes);

        $fileName = $parts['file']['name'];
        $origExt = $parts['file']['extension'];
        $baseUrl = $parts['url']['absolute'];

        $origFilename = $baseUrl. $fileName .'.'.$origExt;

        $sources[] = ["src"=>$origFilename, "extension"=>$origExt,  "mimeType"=> get_mime_by_extension( strtolower($origFilename) )];

        return $sources;

    }

    /**
     * Genera el JSON exacto para los sources del videoplayer...
     * TODO: Comprobar todo cuando se especifiquen las extensiones finales de las previews y se generen...
     * @param $videos
     * @return array
     */
    private function getJsonForVideoPlayer($videos)
    {
        /**
         *
         * videos: [
        *{  href : "#", text: "BuckBunny Webm",      sources : [{src:"video/big-buck-bunny_trailer.webm", mimeType: ""}]},
        *{  href : "#", text: "Small MP4",           sources : [{src:"video/small.mp4", mimeType: ""}] },
        *{  href : "#", text: "Trailer 480p mov",    sources : [{src:"video/trailer_480p.mov", mimeType: ""}] },
        *{  href : "#", text: "Small OGV",           sources : [{src:"video/small.ogv", mimeType: ""}] },
        *{  href : "#", text: "Small webM",          sources : [{src:"video/small.webm", mimeType: ""}] }
        *],
         */
        $videosLen = count($videos);
        $videosArr = [];

        for($i = 0; $i < $videosLen; $i++)
        {
            $elemVideo = $videos[$i];

            $sourcesVideo = $elemVideo->sources;
            $sourcesLen = count($sourcesVideo);
            $sourcesArr = [];

            for($j = 0; $j < $sourcesLen; $j ++)
            {
                $elem = $sourcesVideo[$j];
                $sourcesArr[] = $elem;
            }
            $videosArr[] = ["href" => $elemVideo->href, "text"=> cut($elemVideo->text, 20), "sources" => $sourcesArr];
        }

       // print_r(json_encode(["videos"=>$videosArr]));

        return json_encode($videosArr);
    }

	?>