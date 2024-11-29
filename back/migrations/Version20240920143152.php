<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240920143152 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE scenario_metrics (id UUID NOT NULL, scenario_id UUID NOT NULL, total_executions INT NOT NULL, success_executions INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3D4C6AE7E04E49DF ON scenario_metrics (scenario_id)');
        $this->addSql('COMMENT ON COLUMN scenario_metrics.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN scenario_metrics.scenario_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE scenario_metrics ADD CONSTRAINT FK_3D4C6AE7E04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(6) WITHOUT TIME ZONE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE scenario_metrics DROP CONSTRAINT FK_3D4C6AE7E04E49DF');
        $this->addSql('DROP TABLE scenario_metrics');
        $this->addSql('ALTER TABLE log ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
    }
}
